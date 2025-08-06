export const defaultTemplates = {
  form: {
    type: 'form',
    title: 'Contact Form',
    fields: [
      { type: 'text', label: 'Name', required: true },
      { type: 'text', label: 'Email', required: true },
      { type: 'select', label: 'Subject', options: ['General', 'Support', 'Sales'] },
      { type: 'textarea', label: 'Message', required: true }
    ]
  },
  
  button: {
    type: 'button',
    text: 'Click Me',
    variant: 'primary'
  },
  
  card: {
    type: 'card',
    title: 'Feature Card',
    description: 'This is a sample card component',
    content: 'Add your content here...'
  },
  
  table: {
    type: 'table',
    columns: ['Name', 'Role', 'Status'],
    rows: [
      ['John Doe', 'Developer', 'Active'],
      ['Jane Smith', 'Designer', 'Active']
    ]
  },

  navbar: {
    type: 'navbar',
    brand: 'MyBrand',
    links: ['Home', 'About', 'Services', 'Contact'],
    actions: ['Login', 'Sign Up']
  },

  sidebar: {
    type: 'sidebar',
    title: 'Navigation',
    width: 'w-64',
    items: ['Dashboard', 'Users', 'Settings', 'Analytics', 'Reports']
  },

  modal: {
    type: 'modal',
    title: 'Confirm Action',
    content: 'Are you sure you want to proceed with this action?'
  },

  input: {
    type: 'input',
    label: 'Email Address',
    type: 'email',
    placeholder: 'Enter your email...',
    helper: 'We\'ll never share your email with anyone else.'
  },

  textarea: {
    type: 'textarea',
    label: 'Message',
    placeholder: 'Enter your message here...',
    helper: 'Maximum 500 characters'
  },

  select: {
    type: 'select',
    label: 'Country',
    placeholder: 'Choose your country',
    options: ['United States', 'Canada', 'United Kingdom', 'Australia'],
    helper: 'Select your current location'
  },

  checkbox: {
    type: 'checkbox',
    options: ['Option 1', 'Option 2', 'Option 3', 'Option 4']
  },

  radio: {
    type: 'radio',
    label: 'Select Size',
    options: ['Small', 'Medium', 'Large', 'Extra Large']
  },

  alert: {
    type: 'alert',
    type: 'success',
    title: 'Success!',
    message: 'Your changes have been saved successfully.'
  },

  breadcrumb: {
    type: 'breadcrumb',
    items: ['Home', 'Products', 'Electronics', 'Smartphones']
  },

  tabs: {
    type: 'tabs',
    tabs: ['Overview', 'Details', 'Reviews', 'Specifications']
  },

  badge: {
    type: 'badge',
    text: 'New',
    variant: 'success'
  },

  progress: {
    type: 'progress',
    label: 'Profile Completion',
    value: 75
  },

  chart: {
    type: 'chart',
    title: 'Weekly Sales'
  },

  list: {
    type: 'list',
    title: 'Recent Activities',
    items: [
      'User John signed up',
      'New order received',
      'Payment processed',
      'Email sent to customer',
      'Report generated'
    ]
  },

  grid: {
    type: 'grid',
    columns: 3,
    items: 6
  }
};