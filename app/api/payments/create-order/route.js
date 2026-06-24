import { NextResponse } from 'next/server';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

/**
 * POST /api/payments/create-order
 * Create a Razorpay order for payment processing
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const { amount, currency = 'INR' } = body;

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { success: false, error: 'A valid amount is required' },
        { status: 400, headers: corsHeaders }
      );
    }

    // In production, this would use the Razorpay SDK:
    //
    // const Razorpay = require('razorpay');
    // const instance = new Razorpay({
    //   key_id: process.env.RAZORPAY_KEY_ID,
    //   key_secret: process.env.RAZORPAY_KEY_SECRET,
    // });
    //
    // const order = await instance.orders.create({
    //   amount: amount * 100, // Razorpay expects amount in paise
    //   currency,
    //   receipt: `receipt_${Date.now()}`,
    //   notes: {
    //     source: 'FuelBar Website',
    //   },
    // });
    //
    // return NextResponse.json(order);

    // Mock Razorpay order for development
    const mockOrder = {
      id: 'order_' + Date.now(),
      entity: 'order',
      amount: amount * 100, // Amount in paise
      amount_paid: 0,
      amount_due: amount * 100,
      currency,
      receipt: `receipt_${Date.now()}`,
      status: 'created',
      created_at: Math.floor(Date.now() / 1000),
    };

    return NextResponse.json(mockOrder, { status: 200, headers: corsHeaders });
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create payment order' },
      { status: 500, headers: corsHeaders }
    );
  }
}

/**
 * OPTIONS /api/payments/create-order
 * Handle CORS preflight
 */
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}
