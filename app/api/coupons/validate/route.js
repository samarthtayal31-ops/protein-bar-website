import { NextResponse } from 'next/server';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// Hardcoded coupon definitions
// TODO: Move to Firestore for dynamic coupon management
const COUPONS = {
  FIRST10: {
    code: 'FIRST10',
    type: 'percentage',
    value: 10,
    minOrder: 200,
    description: '10% off on your first order',
    maxDiscount: null, // No cap
  },
  SUMMER20: {
    code: 'SUMMER20',
    type: 'percentage',
    value: 20,
    minOrder: 500,
    description: '20% off on orders above ₹500',
    maxDiscount: 200, // Cap at ₹200
  },
  FLAT50: {
    code: 'FLAT50',
    type: 'flat',
    value: 50,
    minOrder: 300,
    description: '₹50 flat off on orders above ₹300',
    maxDiscount: null,
  },
};

/**
 * POST /api/coupons/validate
 * Validate a coupon code and calculate discount
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const { code, orderTotal } = body;

    if (!code) {
      return NextResponse.json(
        { valid: false, discount: 0, message: 'Coupon code is required' },
        { status: 400, headers: corsHeaders }
      );
    }

    if (!orderTotal || orderTotal <= 0) {
      return NextResponse.json(
        { valid: false, discount: 0, message: 'A valid order total is required' },
        { status: 400, headers: corsHeaders }
      );
    }

    const coupon = COUPONS[code.toUpperCase()];

    if (!coupon) {
      return NextResponse.json(
        { valid: false, discount: 0, message: 'Invalid coupon code' },
        { status: 200, headers: corsHeaders }
      );
    }

    // Check minimum order requirement
    if (orderTotal < coupon.minOrder) {
      return NextResponse.json(
        {
          valid: false,
          discount: 0,
          message: `Minimum order of ₹${coupon.minOrder} required for coupon ${coupon.code}`,
        },
        { status: 200, headers: corsHeaders }
      );
    }

    // Calculate discount
    let discount = 0;

    if (coupon.type === 'percentage') {
      discount = Math.round((orderTotal * coupon.value) / 100);
      // Apply max discount cap if set
      if (coupon.maxDiscount && discount > coupon.maxDiscount) {
        discount = coupon.maxDiscount;
      }
    } else if (coupon.type === 'flat') {
      discount = coupon.value;
    }

    // Ensure discount doesn't exceed order total
    discount = Math.min(discount, orderTotal);

    return NextResponse.json(
      {
        valid: true,
        discount,
        couponCode: coupon.code,
        description: coupon.description,
        message: `Coupon applied! You save ₹${discount}`,
        finalTotal: orderTotal - discount,
      },
      { status: 200, headers: corsHeaders }
    );
  } catch (error) {
    console.error('Error validating coupon:', error);
    return NextResponse.json(
      { valid: false, discount: 0, message: 'Failed to validate coupon' },
      { status: 500, headers: corsHeaders }
    );
  }
}

/**
 * OPTIONS /api/coupons/validate
 * Handle CORS preflight
 */
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}
