// Razorpay integration utility
declare global {
  interface Window {
    Razorpay: any;
  }
}

export interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id?: string;
  handler: (response: any) => void;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  theme: {
    color: string;
  };
  modal: {
    ondismiss: () => void;
  };
}

export const initializeRazorpay = (): Promise<boolean> => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export const createRazorpayOrder = async (amount: number, purpose: string) => {
  try {
    // In production, this would call your backend API
    // For demo, we'll simulate order creation
    const orderId = `order_${Date.now()}${Math.random().toString(36).substr(2, 9)}`;
    
    return {
      success: true,
      order_id: orderId,
      amount: amount * 100, // Razorpay expects amount in paise
      currency: 'INR'
    };
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    return { success: false, error: 'Failed to create order' };
  }
};

export const processRazorpayPayment = (options: RazorpayOptions) => {
  const rzp = new window.Razorpay(options);
  rzp.open();
};