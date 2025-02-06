// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type Invoice = {
  id: string;
  customer_id: string;
  amount: number;
  date: string;
  // In TypeScript, this is called a string union type.
  // It means that the status property can only be one of the two strings: 'pending' or 'paid'.
  status: 'pending' | 'paid';
};

export type Revenue = {
  month: string;
  revenue: number;
  day?: string;
};

export type LatestInvoice = {
  id: string;
  name: string;
  image_url: string;
  email: string;
  amount: string;
};

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type LatestInvoiceRaw = Omit<LatestInvoice, 'amount'> & {
  amount: number;
};

export type InvoicesTable = {
  id: string;
  customer_id: string;
  name: string;
  email: string;
  image_url: string;
  date: string;
  amount: number;
  status: 'pending' | 'paid';
};

export type CustomersTableType = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: number;
  total_paid: number;
};

export type FormattedCustomersTable = {
  customer_id: string;
  customer_name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: string;
  total_paid: string;
};

export type CustomerField = {
  id: string;
  name: string;
};

export type InvoiceForm = {
  id: string;
  customer_id: string;
  amount: number;
  status: 'pending' | 'paid';
};

export type SalesOrder = {
  customer_id: string;
  customer_name: string;
  company_name: string;
  email: string;
  total: number;
  order_status: string;
  status: string;
  createdAt: string;
  paid_status: string;
  salesorder_number: string;
  reference_number: string;
  cf_reseller_name: string;
  last_modified_time: string;
}

export type OrderSync = {
  last_updated: string
}

export type Package = {
  package_id: string,
  salesorder_id: string,
  shipment_id: string,
  customer_id: string,
  customer_name: string,
  status: string,
  package_number: string,
  tracking_number: string,
  is_tracking_enabled: boolean,
  shipment_type: string,
  shipping_charge: number
  date: string,
  quantity: number
  salesorder_number: string,
  created_time: string,
  delivery_method: string
  last_modified_time: string,
  shipment_date: string,
  is_carrier_shipment: boolean,
  label_format: string,
  has_reseller_name?: boolean,
  whatsapp_status?: string
  shipping_address?: Location
}

export type ProductType = {
  id?: number,
  title: string,
  body_html: string,
  vendor: string,
  product_type: string,
  created_at: Date,
  handle: string,
  updated_at: Date,
  published_at: Date,
  template_suffix: string;
  published_scope: string,
  tags: string,
  status: string,
  admin_graphql_api_id: string,
  variants: any,
  images: any,
  image: any,
  options: any
}

export type CustomField = {
  customfield_id: string,
  value: string,
}


export type ShipmentDefaultAttributes = {
  shipment_width: string // default 3, but editable, 
  shipment_height: string //default 15, but editable, 
  shipment_length: string //default 10, but editable, 
  weight: string //default 400, but editable, 
  shipping_mode: string //default Surface but editable - possible value(express), 
  payment_mode: string // default but editable, 
}

export type Shipment = ShipmentDefaultAttributes & {
  name: string //string // from package,      
  address_type?: string //default home
  add: string // string // from package,      
  pin: string // string // from package,
  city: string //string // from package, 
  state: string // from package, 
  country: string // default, 
  phone: string // from package, 

  order: string // from package, 
  order_date?: string // from package, 
  products_desc?: string // from package, 
  total_amount: string // from package, 

  return_pin?: string // default, 
  return_city?: string // default, 
  return_phone?: string // default, 
  return_add?: string // default, 
  return_state?: string // default, 
  return_country?: string // default, 

  hsn_code?: string //from package/ignore, 
  cod_amount?: string // from package, 
  seller_add?: string // from package, 
  seller_name?: string // from package, 
  seller_inv?: string // from package, 
  quantity: string // from package, 
  waybill?: string // from package, 

  seller_gst_tin?: string //from package/ignore, 
}

export type SalesOrderAudit = {
  package_id: string,
  salesorder_id: string,
  shipment_id?: string,
  customer_id?: string,
  package_number?: string,
  tracking_number?: string,
  salesorder_number?: string,
}

export type ProcessSalesOrderRequest = {
  salesorder_id: string,
  shipment_length: string,
  shipment_width: string,
  shipment_height: string,
  weight: string,
  shipping_mode: string,
  payment_mode: string,
  processing_status?: number,
  success?: boolean,
  errorMsg?:string
}

const SHIPMENT_DEFAULT_PROPERTIES = {
  country: 'India',
  return_country: 'India',
  address_type: 'home',
  return_pin: 500084, // default, 
  return_city: 'Telangana', // default, 
  return_phone: 8985480894, // default, 
  return_add: 'Flat No 402, Chaturdhuja Homes 1, Street No-8 Jubliee Garden, Kondapur', // default, 
  return_state: 'Telangana', // default, 
  pickup_location: {
    name: 'Siri Enterprises',
    add: 'Flat No 402, Chaturdhuja Homes 1, Street No-8 Jubliee Garden, Kondapur',
    city: 'Hyderabad',
    ststae: 'Telangana',
    pin_code: 500084,
    country: 'India',
    phone: '8985480894',
  },
};


export type PickUpLocation = {
  name: string,
  street2?: string
  city?: string
  state?: string
  zip?: string
  country?: string
  fax?: string
  phone?: string
  attention?: string
  country_code?: string, // in sales Order
  state_code?: string, // in sales Order
}

export type Location = {
  name: string
  add: string
  city: string
  pin_code: number
  country: string
  phone: string
}

export type Address = {
  address: string
  street2?: string
  city: string
  state: string
  zip: string
  country: string
  fax: string
  phone: string
  attention: string
  country_code?: string, // in sales Order
  state_code?: string, // in sales Order
}

export type ShipmentCreate = {
  shipments: Array<Shipment>
  pickup_location: Location
}