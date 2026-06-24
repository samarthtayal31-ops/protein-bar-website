import { NextResponse } from 'next/server';
import { db } from '@/app/lib/firebase';
import { collection, addDoc, getDocs, query, orderBy } from 'firebase/firestore';

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

    // Save order to Firestore
    const docRef = await addDoc(collection(db, 'orders'), order);
    order.id = docRef.id;

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
    // Fetch from Firestore
    const ordersRef = collection(db, 'orders');
    const q = query(ordersRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    const orders = [];
    querySnapshot.forEach((doc) => {
      orders.push({ id: doc.id, ...doc.data() });
    });

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
