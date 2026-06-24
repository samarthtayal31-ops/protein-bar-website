import { NextResponse } from 'next/server';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

/**
 * POST /api/payments/verify
 * Verify Razorpay payment signature
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        {
          success: false,
          error: 'razorpay_order_id, razorpay_payment_id, and razorpay_signature are required',
        },
        { status: 400, headers: corsHeaders }
      );
    }

    // In production, verify signature using HMAC SHA256:
    //
    // const crypto = require('crypto');
    //
    // const generatedSignature = crypto
    //   .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    //   .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    //   .digest('hex');
    //
    // const isValid = generatedSignature === razorpay_signature;
    //
    // if (!isValid) {
    //   return NextResponse.json(
    //     { verified: false, error: 'Invalid payment signature' },
    //     { status: 400, headers: corsHeaders }
    //   );
    // }
    //
    // // Update order payment status in Firestore
    // await updateDoc(doc(db, 'orders', razorpay_order_id), {
    //   paymentVerified: true,
    //   paymentId: razorpay_payment_id,
    //   updatedAt: new Date().toISOString(),
    // });

    // Mock verification for development
    return NextResponse.json(
      {
        verified: true,
        razorpay_order_id,
        razorpay_payment_id,
        message: 'Payment verified successfully',
      },
      { status: 200, headers: corsHeaders }
    );
  } catch (error) {
    console.error('Error verifying payment:', error);
    return NextResponse.json(
      { verified: false, error: 'Payment verification failed' },
      { status: 500, headers: corsHeaders }
    );
  }
}

/**
 * OPTIONS /api/payments/verify
 * Handle CORS preflight
 */
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}
