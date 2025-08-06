export const defaultTemplates = {
  form: {
    type: 'form',
    title: 'Contact Form',
    fields: [
      {
        type: 'text',
        label: 'Name',
        name: 'name',
        placeholder: 'Enter your name',
      },
      {
        type: 'email',
        label: 'Email',
        name: 'email',
        placeholder: 'Enter your email',
      },
      {
        type: 'textarea',
        label: 'Message',
        name: 'message',
        placeholder: 'Enter your message',
      },
      {
        type: 'submit',
        label: 'Send Message',
      },
    ],
  },

  text: {
    type: 'text',
    title: 'Text Block',
    content: 'This is a simple text block. Edit the JSON to change it.',
  },

  button: {
    type: 'button',
    label: 'Click Me',
    onClick: 'alert("Button clicked!")',
  },
};
