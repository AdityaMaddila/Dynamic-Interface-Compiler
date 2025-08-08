# Dynamic Interface Compiler

A powerful React-based visual interface builder that lets you create dynamic UIs through JSON schemas with drag-and-drop functionality, real-time preview, and 21+ pre-built components.

## 🚀 Quick Start

```bash
git clone <your-repo-url>
cd dynamic-interface-compiler
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000) to start building!

## ✨ Key Features

- **🎨 Visual Drag & Drop Builder** - Intuitive component palette with real-time preview
- **📐 Dual Layout Modes** - List (vertical stacking) and Grid (positioned cells) layouts
- **🧩 21+ Components** - Forms, tables, charts, navigation, media, inputs, and more
- **⚡ Live JSON Editor** - Real-time synchronization between visual and JSON editing
- **🔒 Advanced Form Validation** - Custom logic injection + structured rule validation with helper popup
- **📱 Responsive Design** - All components work seamlessly across devices
- **🎯 Interactive Components** - Sortable tables, tabbed interfaces, progress bars, image galleries

## 🎯 How It Works

1. **Drag Components** from the left palette to the preview area
2. **Switch Layouts** between List (vertical flow) and Grid (positioned cells)
3. **Edit JSON** directly or use the visual editor - both sync in real-time
4. **Customize** component properties through JSON schema
5. **Validate Forms** using custom JavaScript logic or structured rules

## 🧩 Component Library (21 Components)

### 📝 Forms & Inputs
| Component | Description |
|-----------|-------------|
| **Form** | Complete form with advanced validation |
| **Input** | Text, email, number inputs with validation |
| **Textarea** | Multi-line text input |
| **Select** | Dropdown selection with options |
| **Checkbox** | Multiple choice selections |
| **Radio** | Single choice selection |

### 🏗️ Layout & Navigation
| Component | Description |
|-----------|-------------|
| **Card** | Content containers with titles |
| **Grid** | Flexible grid layouts |
| **Sidebar** | Navigation sidebars |
| **Navbar** | Top navigation bars |
| **Tabs** | Tabbed content interfaces |
| **Modal** | Popup dialog boxes |

### 📊 Data & Visualization
| Component | Description |
|-----------|-------------|
| **Table** | Sortable data tables |
| **List** | Organized item lists |
| **Chart** | Visual data representations |
| **Progress** | Progress bars with percentages |
| **Image** | Images with lazy loading, lightbox, and overlays |

### 🎨 UI Elements
| Component | Description |
|-----------|-------------|
| **Button** | Interactive buttons with variants |
| **Alert** | Status messages and notifications |
| **Badge** | Status indicators and labels |
| **Breadcrumb** | Navigation breadcrumbs |

## 📋 Schema Examples

### Simple Contact Form
```json
{
  "type": "form",
  "title": "Contact Form",
  "fields": [
    { "type": "text", "label": "Name", "required": true },
    { "type": "email", "label": "Email", "required": true },
    { "type": "select", "label": "Subject", "options": ["General", "Support", "Sales"] },
    { "type": "textarea", "label": "Message", "required": true }
  ]
}
```

### Interactive Data Table
```json
{
  "type": "table", 
  "columns": ["Name", "Role", "Status", "Actions"],
  "rows": [
    ["John Doe", "Developer", "Active", "Edit"],
    ["Jane Smith", "Designer", "Active", "Edit"]
  ]
}
```

### Responsive Image Gallery
```json
{
  "type": "image",
  "title": "Product Gallery",
  "src": "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400",
  "alt": "Product image",
  "caption": "Click to view full size",
  "clickable": true,
  "onClick": "lightbox",
  "hover": true,
  "lazy": true,
  "fit": "cover"
}
```

## 🏗️ Layout Structures

### List Layout (Vertical Stacking)
```json
{
  "layout": "list",
  "components": [
    { "type": "navbar", "brand": "MyApp", "links": ["Home", "About"] },
    { "type": "card", "title": "Welcome", "content": "Get started building!" },
    { "type": "form", "title": "Newsletter", "fields": [...] }
  ]
}
```

### Grid Layout (Positioned Cells)
```json
{
  "layout": "grid",
  "components": {
    "0-0": { "type": "sidebar", "title": "Menu", "items": ["Dashboard", "Users"] },
    "0-1": { "type": "form", "title": "Login Form", "fields": [...] },
    "1-1": { "type": "chart", "title": "Analytics", "data": [...] }
  }
}
```

## 🔒 Advanced Form Validation System

### Custom Logic Validation (JavaScript)
Write custom validation logic with safe execution environment:

```javascript
// Available helper functions and context
"if (isEmpty(values.name)) return 'Name is required';
if (values.email && !isEmail(values.email)) return 'Invalid email format';  
if (values.age && values.age < 18) return 'Must be 18 or older';
if (values.password && length(values.password) < 8) return 'Password too short';
return true; // All validation passed"
```

**NOTE**: To test this and implement this, substitute the whole json block with:

```json
{
  "layout": "list",
  "components": [
    {
      "type": "form",
      "title": "Contact Form",
      "fields": [
        {
          "type": "text",
          "label": "Name",
          "required": true
        },
        {
          "type": "text",
          "label": "Email",
          "required": true
        },
        {
          "type": "select",
          "label": "Subject",
          "options": ["General", "Support", "Sales"]
        },
        {
          "type": "textarea",
          "label": "Message",
          "required": true
        }
      ],
      "onSubmit": "if (isEmpty(values.Name)) return 'Name is required'; if (values.Email && !isEmail(values.Email)) return 'Invalid email format'; if (values.Name && length(values.Name) < 2) return 'Name must be at least 2 characters long'; if (values.Message && length(values.Message) > 500) return 'Message cannot exceed 500 characters'; return true;",
      "id": "form_1754631591389"
    }
  ]
}
```
###  ***NOTE= Always make sure that these multiple if conditions are passed ina  single line seperated with a ; as above,because multiline parsing looks bad in the json editor

#### **Available Helper Functions:**
| Function | Parameters | Description | Example |
|----------|------------|-------------|---------|
| `isEmpty(value)` | `value: any` | Check if value is empty, null, undefined, or whitespace only | `isEmpty(values.name)` |
| `isEmail(email)` | `email: string` | Validate email format using RFC compliant regex | `isEmail(values.email)` |
| `isPhone(phone)` | `phone: string` | Validate phone number (international format, 7-16 digits) | `isPhone(values.phone)` |
| `length(value)` | `value: string` | Get string length (returns 0 for null/undefined) | `length(values.message)` |
| `includes(str, substr)` | `str: string, substr: string` | Check if string contains substring (case-sensitive) | `includes(values.name, 'admin')` |

#### **Available Math Functions:**
| Function | Description | Example |
|----------|-------------|---------|
| `Math.min(a, b, ...)` | Return minimum value | `Math.min(values.age, 65)` |
| `Math.max(a, b, ...)` | Return maximum value | `Math.max(values.score, 0)` |
| `Math.abs(num)` | Return absolute value | `Math.abs(values.balance)` |
| `Math.floor(num)` | Round down to integer | `Math.floor(values.rating)` |
| `Math.ceil(num)` | Round up to integer | `Math.ceil(values.hours)` |
| `Math.round(num)` | Round to nearest integer | `Math.round(values.price)` |

#### **Advanced Logic Examples:**
```javascript
// Complex age validation
"if (isEmpty(values.Age)) return 'Age is required'; 
if (values.Age < 13) return 'Must be at least 13 years old'; 
if (values.Age > 120) return 'Please enter a valid age'; 
return true;"

// Password strength validation
"if (isEmpty(values.Password)) return 'Password required';
if (length(values.Password) < 8) return 'Password must be at least 8 characters';
if (!includes(values.Password, '@') && !includes(values.Password, '#')) return 'Password must contain special character';
return true;"

// Conditional validation based on other fields
"if (values.Type === 'Premium' && isEmpty(values.CreditCard)) return 'Credit card required for premium';
if (values.Age < 18 && isEmpty(values.ParentEmail)) return 'Parent email required for minors';
return true;"

// Numeric range validation
"if (isEmpty(values.Salary)) return 'Salary is required';
if (values.Salary < 0) return 'Salary cannot be negative';
if (values.Salary > 1000000) return 'Please enter a realistic salary';
return true;"


NOTE**= Always make sure that these multiple if conditions are passed ina  single line seperated wiht a ; because multiline parsing looks bad in the json editor
```

### Structured Rule Validation
Traditional rule-based validation with comprehensive rule set:

#### **Text Validation Rules**
| Rule | Parameters | Description | Example |
|------|------------|-------------|---------|
| `required` | none | Field must not be empty or whitespace only | `{ "rule": "required", "message": "This field is required" }` |
| `minLength` | `value: number` | Minimum character count (excluding whitespace) | `{ "rule": "minLength", "value": 3, "message": "Minimum 3 characters required" }` |
| `maxLength` | `value: number` | Maximum character count (including whitespace) | `{ "rule": "maxLength", "value": 50, "message": "Maximum 50 characters allowed" }` |
| `pattern` | `value: string` | Custom regex pattern validation | `{ "rule": "pattern", "value": "^[A-Za-z\\s]+$", "message": "Letters and spaces only" }` |

#### **Format Validation Rules**
| Rule | Parameters | Description | Example |
|------|------------|-------------|---------|
| `email` | none | RFC 5322 compliant email format | `{ "rule": "email", "message": "Please enter a valid email address" }` |
| `phone` | none | International phone format (+1234567890) | `{ "rule": "phone", "message": "Enter valid phone number" }` |
| `url` | none | Valid HTTP/HTTPS URL format | `{ "rule": "url", "message": "Enter a valid URL" }` |
| `alphanumeric` | none | Letters and numbers only (no spaces/symbols) | `{ "rule": "alphanumeric", "message": "Letters and numbers only" }` |
| `alpha` | none | Letters only (a-z, A-Z) | `{ "rule": "alpha", "message": "Letters only" }` |
| `numeric` | none | Numbers only (0-9) | `{ "rule": "numeric", "message": "Numbers only" }` |

#### **Numeric Validation Rules**
| Rule | Parameters | Description | Example |
|------|------------|-------------|---------|
| `min` | `value: number` | Minimum numeric value (inclusive) | `{ "rule": "min", "value": 18, "message": "Must be 18 or older" }` |
| `max` | `value: number` | Maximum numeric value (inclusive) | `{ "rule": "max", "value": 100, "message": "Cannot exceed 100" }` |
| `integer` | none | Whole numbers only (no decimals) | `{ "rule": "integer", "message": "Enter a whole number" }` |
| `positive` | none | Positive numbers only (> 0) | `{ "rule": "positive", "message": "Enter a positive number" }` |
| `negative` | none | Negative numbers only (< 0) | `{ "rule": "negative", "message": "Enter a negative number" }` |
| `decimal` | `value: number` | Decimal places limit | `{ "rule": "decimal", "value": 2, "message": "Maximum 2 decimal places" }` |

#### **Date/Time Validation Rules**
| Rule | Parameters | Description | Example |
|------|------------|-------------|---------|
| `date` | none | Valid date format (YYYY-MM-DD) | `{ "rule": "date", "message": "Enter valid date" }` |
| `minDate` | `value: string` | Minimum date (YYYY-MM-DD) | `{ "rule": "minDate", "value": "2024-01-01", "message": "Date must be after Jan 1, 2024" }` |
| `maxDate` | `value: string` | Maximum date (YYYY-MM-DD) | `{ "rule": "maxDate", "value": "2024-12-31", "message": "Date must be before Dec 31, 2024" }` |
| `age` | `value: number` | Minimum age based on birthdate | `{ "rule": "age", "value": 18, "message": "Must be 18 years old" }` |

#### **Advanced Validation Rules**
| Rule | Parameters | Description | Example |
|------|------------|-------------|---------|
| `custom` | `value: function` | Custom validation function | `{ "rule": "custom", "value": "return value.includes('@company.com')", "message": "Must be company email" }` |
| `match` | `value: string` | Must match another field's value | `{ "rule": "match", "value": "password", "message": "Passwords must match" }` |
| `unique` | `value: array` | Value must be unique in provided array | `{ "rule": "unique", "value": ["existing1", "existing2"], "message": "Username already exists" }` |
| `contains` | `value: string` | Must contain specific substring | `{ "rule": "contains", "value": "@", "message": "Must contain @ symbol" }` |
| `notContains` | `value: string` | Must not contain specific substring | `{ "rule": "notContains", "value": "admin", "message": "Cannot contain 'admin'" }` |

#### **Complete Structured Validation Example:**
```json
{
  "type": "form",
  "title": "User Registration",
  "fields": [
    { "type": "text", "label": "Username", "required": true },
    { "type": "email", "label": "Email", "required": true },
    { "type": "password", "label": "Password", "required": true },
    { "type": "password", "label": "Confirm Password", "required": true },
    { "type": "number", "label": "Age", "required": true },
    { "type": "text", "label": "Phone", "required": false }
  ],
  "onSubmit": {
    "validation": [
      {
        "field": "Username",
        "rule": "minLength",
        "value": 3,
        "message": "Username must be at least 3 characters"
      },
      {
        "field": "Username",
        "rule": "alphanumeric",
        "message": "Username can only contain letters and numbers"
      },
      {
        "field": "Email",
        "rule": "email",
        "message": "Please enter a valid email address"
      },
      {
        "field": "Password",
        "rule": "minLength",
        "value": 8,
        "message": "Password must be at least 8 characters"
      },
      {
        "field": "Password",
        "rule": "pattern",
        "value": "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)",
        "message": "Password must contain uppercase, lowercase, and number"
      },
      {
        "field": "Confirm Password",
        "rule": "match",
        "value": "Password",
        "message": "Passwords must match"
      },
      {
        "field": "Age",
        "rule": "min",
        "value": 13,
        "message": "Must be at least 13 years old"
      },
      {
        "field": "Age",
        "rule": "max",
        "value": 120,
        "message": "Please enter a valid age"
      },
      {
        "field": "Phone",
        "rule": "phone",
        "message": "Please enter a valid phone number"
      }
    ],
    "action": "showAlert",
    "successMessage": "Registration successful!",
    "errorMessage": "Please fix the errors above"
  }
}
```

> 💡**: Interactive popup helper showing all available validation methods, examples, and usage patterns!

## 🎨 Component Customization

### Form Components
```json
{
  "type": "form",
  "title": "User Registration",
  "fields": [
    {
      "type": "text",
      "label": "Full Name", 
      "required": true,
      "placeholder": "Enter your full name"
    },
    {
      "type": "select",
      "label": "Country",
      "options": ["USA", "Canada", "UK", "Australia"],
      "helper": "Select your country of residence"
    }
  ],
  "onSubmit": "return isEmail(values.email) && !isEmpty(values.name)"
}
```

### Interactive Elements
```json
{
  "type": "table",
  "columns": ["Product", "Price", "Stock"],
  "rows": [
    ["Laptop", "$999", "In Stock"],
    ["Mouse", "$29", "Low Stock"]
  ]
}
```

### Media Components
```json
{
  "type": "image",
  "src": "https://example.com/hero.jpg",
  "width": "100%",
  "height": "400px",
  "fit": "cover",
  "overlay": "bg-black bg-opacity-40",
  "overlayText": "Welcome to Our Platform",
  "clickable": true,
  "onClick": "https://example.com"
}
```

## 🏗️ Architecture

### Core Components
```
src/
├── components/
│   ├── DynamicInterfaceCompiler.jsx  # Main app container
│   ├── ComponentPalette.jsx          # Draggable component library  
│   ├── JsonEditor.jsx                # Live JSON schema editor
│   ├── LivePreview.jsx               # Visual preview with layouts
│   ├── ComponentWrapper.jsx          # Component controls & actions
│   └── Header.jsx                    # App header & navigation
|   └── Footer.jsx                    # App Footer
|   └── SchemaManager.jsx             # Schema Panel Features
|   └── TemplatePanel.jsx             #Contains various Components to drag and drop
├── library/
│   └── ComponentLibrary.js           # 15+ UI components
└── utils/
    └── defaultTemplates.js           # Pre-configured templates
```

### State Management
- **React Hooks** for component-level state
- **Centralized state** in main container
- **Real-time sync** between JSON and visual editors
- **Drag & drop state** management

### Security Features
- **Sandboxed execution** for custom validation logic
- **Restricted globals** - Only safe utility functions allowed
- **No eval()** usage - Uses Function constructor with limited scope
- **Input sanitization** for all user data

## 🎯 Use Cases

- **🚀 Rapid Prototyping** - Build UI mockups in minutes
- **📋 Dynamic Forms** - Create complex forms with custom validation
- **📊 Admin Dashboards** - Design data-rich interfaces
- **🎨 Landing Pages** - Compose marketing pages visually
- **⚙️ Configuration UIs** - Build settings and admin panels
- **📱 App Mockups** - Prototype mobile and web applications

## 🔧 Development

### Adding Custom Components
1. Create component in `ComponentLibrary.js`:
```javascript
const MyComponent = ({ schema }) => (
  <div className="p-4 bg-gray-800 rounded-lg">
    <h3 className="text-white">{schema.title}</h3>
    <p className="text-gray-300">{schema.content}</p>
  </div>
);

// Add to library
ComponentLibrary.mycomponent = MyComponent;
```

2. Add template in `defaultTemplates.js`:
```javascript
mycomponent: {
  type: 'mycomponent',
  title: 'My Custom Component',
  content: 'Default content here'
}
```

3. Add to `ComponentPalette.jsx`:
```javascript
{ type: 'mycomponent', icon: Star, name: 'My Component', color: 'text-blue-400' }
```

### Validation System Architecture
- **Dual-mode validation** supports both custom logic and structured rules
- **Safe execution environment** prevents malicious code execution
- **Helper function library** provides common validation utilities
- **Real-time feedback** with error highlighting and messages

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and test thoroughly
4. Add component to library, templates, and palette
5. Update documentation if needed
6. Submit pull request with clear description

### Development Guidelines
- Follow React best practices and hooks patterns
- Maintain consistent styling with Tailwind CSS
- Add comprehensive error handling
- Test drag-and-drop functionality
- Document new components and features

## 🙏 Acknowledgments

- **Lucide React** for beautiful icons
- **Tailwind CSS** for rapid styling
- **React** for the amazing framework
- **Unsplash** for sample images in examples

---

**Built with ❤️ using React + Tailwind CSS**  
**21 Components • Dual Layouts • Advanced Validation • Real-time Preview**

*Start building dynamic interfaces in minutes, not hours!*
