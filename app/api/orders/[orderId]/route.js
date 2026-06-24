import { NextResponse } from 'next/server';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, PUT, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

const VALID_STATUSES = ['placed', 'confirmed', 'shipped', 'delivered', 'cancelled'];

/**
 * GET /api/orders/[orderId]
 * Get a single order by ID
 */
export async function GET(request, { params }) {
  try {
    const { orderId } = await params;

    // TODO: Fetch from Firestore
    // const docRef = doc(db, 'orders', orderId);
    // const docSnap = await getDoc(docRef);

    // Mock order for development
    const order = {
      orderId,
      items: [
        { productId: 'power-choc', name: 'POWER BAR', flavor: 'Chocolate Hazelnut', size: '55g', quantity: 2, price: 90 },
        { productId: 'beast-dates', name: 'BEAST BAR', flavor: 'Dates & Walnut', size: '70g', quantity: 1, price: 125 },
      ],
      customer: {
        name: 'Rahul Sharma',
        email: 'rahul@example.com',
        phone: '+919876543210',
        address: '42 MG Road, Bangalore 560001',
      },
      paymentMethod: 'online',
      paymentId: 'pay_mock123',
      totalAmount: 305,
      deliveryFee: 0,
      couponCode: null,
      status: 'confirmed',
      createdAt: '2025-06-23T10:00:00.000Z',
      updatedAt: '2025-06-23T12:30:00.000Z',
    };

    return NextResponse.json(
      { success: true, order },
      { status: 200, headers: corsHeaders }
    );
  } catch (error) {
    console.error('Error fetching order:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch order' },
      { status: 500, headers: corsHeaders }
    );
  }
}

/**
 * PUT /api/orders/[orderId]
 * Update order status
 */
export async function PUT(request, { params }) {
  try {
    const { orderId } = await params;
    const body = await request.json();
    const { status } = body;

    if (!status || !VALID_STATUSES.includes(status)) {
      return NextResponse.json(
        {
          success: false,
          error: `Invalid status. Must be one of: ${VALID_STATUSES.join(', ')}`,
        },
        { status: 400, headers: corsHeaders }
      );
    }

    // TODO: Update in Firestore
    // const docRef = doc(db, 'orders', orderId);
    // await updateDoc(docRef, { status, updatedAt: new Date().toISOString() });

    const updatedOrder = {
      orderId,
      status,
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json(
      { success: true, order: updatedOrder },
      { status: 200, headers: corsHeaders }
    );
  } catch (error) {
    console.error('Error updating order:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update order' },
      { status: 500, headers: corsHeaders }
    );
  }
}

/**
 * OPTIONS /api/orders/[orderId]
 * Handle CORS preflight
 */
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}
