import { NextResponse } from 'next/server';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

/**
 * POST /api/orders
 * Create a new order
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const {
      items,
      customer,
      paymentMethod,
      paymentId,
      totalAmount,
      deliveryFee,
      couponCode,
    } = body;

    // Validate required fields
    if (!items || !items.length) {
      return NextResponse.json(
        { success: false, error: 'Order must contain at least one item' },
        { status: 400, headers: corsHeaders }
      );
    }

    if (!customer || !customer.name || !customer.phone || !customer.address) {
      return NextResponse.json(
        { success: false, error: 'Customer name, phone, and address are required' },
        { status: 400, headers: corsHeaders }
      );
    }

    if (!paymentMethod || !['online', 'cod'].includes(paymentMethod)) {
      return NextResponse.json(
        { success: false, error: 'Payment method must be "online" or "cod"' },
        { status: 400, headers: corsHeaders }
      );
    }

    if (paymentMethod === 'online' && !paymentId) {
      return NextResponse.json(
        { success: false, error: 'Payment ID is required for online payments' },
        { status: 400, headers: corsHeaders }
      );
    }

    // Generate order ID: FB-<timestamp-based>
    const timestamp = Date.now();
    const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
    const orderId = `FB-${timestamp}-${randomSuffix}`;

    const order = {
      orderId,
      items,
      customer,
      paymentMethod,
      paymentId: paymentId || null,
      totalAmount,
      deliveryFee: deliveryFee || 0,
      couponCode: couponCode || null,
      status: 'placed',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // TODO: Save order to Firestore
    // const docRef = await addDoc(collection(db, 'orders'), order);

    return NextResponse.json(
      { success: true, orderId, order },
      { status: 201, headers: corsHeaders }
    );
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create order' },
      { status: 500, headers: corsHeaders }
    );
  }
}

/**
 * GET /api/orders
 * List orders (admin)
 */
export async function GET() {
  try {
    // TODO: Fetch from Firestore with admin auth check
    // const querySnapshot = await getDocs(collection(db, 'orders'));

    // Mock orders for development
    const orders = [
      {
        orderId: 'FB-1719158400000-A1B2',
        items: [
          { productId: 'power-choc', name: 'POWER BAR', flavor: 'Chocolate Hazelnut', size: '55g', quantity: 2, price: 90 },
          { productId: 'spark-dates', name: 'SPARK BAR', flavor: 'Dates & Walnut', size: '40g', quantity: 1, price: 65 },
        ],
        customer: { name: 'Rahul Sharma', email: 'rahul@example.com', phone: '+919876543210', address: '42 MG Road, Bangalore 560001' },
        paymentMethod: 'online',
        paymentId: 'pay_mock123',
        totalAmount: 245,
        deliveryFee: 0,
        couponCode: null,
        status: 'delivered',
        createdAt: '2025-06-23T10:00:00.000Z',
        updatedAt: '2025-06-25T14:30:00.000Z',
      },
      {
        orderId: 'FB-1719244800000-C3D4',
        items: [
          { productId: 'beast-choc', name: 'BEAST BAR', flavor: 'Chocolate Hazelnut', size: '70g', quantity: 3, price: 120 },
        ],
        customer: { name: 'Priya Patel', email: 'priya@example.com', phone: '+919123456789', address: '15 Marine Drive, Mumbai 400020' },
        paymentMethod: 'cod',
        paymentId: null,
        totalAmount: 360,
        deliveryFee: 40,
        couponCode: 'FIRST10',
        status: 'shipped',
        createdAt: '2025-06-24T08:15:00.000Z',
        updatedAt: '2025-06-25T09:00:00.000Z',
      },
    ];

    return NextResponse.json(
      { success: true, orders, total: orders.length },
      { status: 200, headers: corsHeaders }
    );
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch orders' },
      { status: 500, headers: corsHeaders }
    );
  }
}

/**
 * OPTIONS /api/orders
 * Handle CORS preflight
 */
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}
