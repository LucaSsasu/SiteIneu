// complaint-form.js - JavaScript for handling the complaint form

document.addEventListener('DOMContentLoaded', function() {
    // Get form elements
    const complaintForm = document.getElementById('complaintForm');
    const resetBtn = document.getElementById('resetBtn');
    const successAlert = document.getElementById('successAlert');
    const errorAlert = document.getElementById('errorAlert');
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    // Form validation function
    function validateForm() {
      let isValid = true;
      
      // Reset all error messages
      document.querySelectorAll('.error-message').forEach(el => {
        el.style.display = 'none';
      });
      
      // Validate first name
      const firstName = document.getElementById('firstName');
      if (!firstName.value.trim()) {
        document.getElementById('firstNameError').style.display = 'block';
        isValid = false;
      }
      
      // Validate last name
      const lastName = document.getElementById('lastName');
      if (!lastName.value.trim()) {
        document.getElementById('lastNameError').style.display = 'block';
        isValid = false;
      }
      
      // Validate email
      const email = document.getElementById('email');
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email.value.trim() || !emailRegex.test(email.value)) {
        document.getElementById('emailError').style.display = 'block';
        isValid = false;
      }
      
      // Validate phone if provided
      const phone = document.getElementById('phone');
      if (phone.value.trim()) {
        const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
        if (!phoneRegex.test(phone.value)) {
          document.getElementById('phoneError').style.display = 'block';
          isValid = false;
        }
      }
      
      // Validate category
      const category = document.getElementById('category');
      if (!category.value) {
        document.getElementById('categoryError').style.display = 'block';
        isValid = false;
      }
      
      // Validate subject
      const subject = document.getElementById('subject');
      if (!subject.value.trim()) {
        document.getElementById('subjectError').style.display = 'block';
        isValid = false;
      }
      
      // Validate description
      const description = document.getElementById('description');
      if (!description.value.trim() || description.value.length < 10) {
        document.getElementById('descriptionError').style.display = 'block';
        isValid = false;
      }
      
      // Validate consent
      const consent = document.getElementById('consent');
      if (!consent.checked) {
        document.getElementById('consentError').style.display = 'block';
        isValid = false;
      }
      
      return isValid;
    }
    
    // Handle form submission
    complaintForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Hide any previous alerts
      successAlert.style.display = 'none';
      errorAlert.style.display = 'none';
      
      // Validate the form
      if (validateForm()) {
        // Normally we'd submit the form data to a server here
        // For demonstration, we'll simulate a successful submission
        
        // Create a FormData object
        const formData = new FormData(complaintForm);
        
        // Log form data for demonstration
        console.log('Form submitted with the following data:');
        for (let [key, value] of formData.entries()) {
          console.log(`${key}: ${value}`);
        }
        
        // Generate a random reference number
        const refNumber = 'INE' + Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
        console.log('Reference Number:', refNumber);
        
        // Show success message
        successAlert.innerHTML = `Thank you for your submission! Your complaint has been received and will be processed by our team. Your reference number is <strong>${refNumber}</strong>. A confirmation has been sent to your email.`;
        successAlert.style.display = 'block';
        
        // Scroll to the success message
        successAlert.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Reset the form
        complaintForm.reset();
        
        // In a real application, you would send the form data to a server
      // For example, using fetch API:
      /*
      fetch('api/submit-complaint', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        // Handle success
        successAlert.innerHTML = `Thank you for your submission! Your complaint has been received and will be processed by our team. Your reference number is <strong>${data.referenceNumber}</strong>. A confirmation has been sent to your email.`;
        successAlert.style.display = 'block';
        complaintForm.reset();
        successAlert.scrollIntoView({ behavior: 'smooth', block: 'center' });
      })
      .catch(error => {
        // Handle error
        errorAlert.textContent = 'There was an error submitting your complaint. Please try again later.';
        errorAlert.style.display = 'block';
        errorAlert.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
      */
    } else {
        // Show error message if validation fails
        errorAlert.textContent = 'Please fix the errors in the form before submitting.';
        errorAlert.style.display = 'block';
        errorAlert.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
    
    // Handle form reset button
    resetBtn.addEventListener('click', function() {
      // Reset form
      complaintForm.reset();
      
      // Hide alerts
      successAlert.style.display = 'none';
      errorAlert.style.display = 'none';
      
      // Clear error messages
      document.querySelectorAll('.error-message').forEach(el => {
        el.style.display = 'none';
      });
    });
    
    // FAQ accordion functionality
    faqQuestions.forEach(question => {
      question.addEventListener('click', function() {
        // Toggle active class on question
        this.classList.toggle('active');
        
        // Toggle display of answer
        const answer = this.nextElementSibling;
        if (answer.style.maxHeight) {
          answer.style.maxHeight = null;
        } else {
          answer.style.maxHeight = answer.scrollHeight + 'px';
        }
      });
    });
    
    // File upload preview functionality
    const fileInput = document.getElementById('fileUpload');
    const filePreview = document.getElementById('filePreview');
    
    fileInput.addEventListener('change', function() {
      filePreview.innerHTML = '';
      
      if (this.files && this.files.length > 0) {
        const maxFiles = 3;
        const maxSize = 5 * 1024 * 1024; // 5MB
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
        
        // Check number of files
        if (this.files.length > maxFiles) {
          document.getElementById('fileError').textContent = `You can only upload up to ${maxFiles} files.`;
          document.getElementById('fileError').style.display = 'block';
          this.value = '';
          return;
        }
        
        let hasError = false;
        
        // Check each file
        for (let i = 0; i < this.files.length; i++) {
          const file = this.files[i];
          
          // Check file size
          if (file.size > maxSize) {
            document.getElementById('fileError').textContent = `File ${file.name} exceeds the maximum size of 5MB.`;
            document.getElementById('fileError').style.display = 'block';
            hasError = true;
            break;
          }
          
          // Check file type
          if (!allowedTypes.includes(file.type)) {
            document.getElementById('fileError').textContent = `File ${file.name} is not a supported file type.`;
            document.getElementById('fileError').style.display = 'block';
            hasError = true;
            break;
          }
          
          // Create file preview element
          const fileItem = document.createElement('div');
          fileItem.className = 'file-item';
          
          // Create file name element
          const fileName = document.createElement('span');
          fileName.textContent = file.name;
          fileItem.appendChild(fileName);
          
          // Add file size info
          const fileSize = document.createElement('small');
          fileSize.textContent = (file.size / 1024).toFixed(1) + ' KB';
          fileItem.appendChild(fileSize);
          
          filePreview.appendChild(fileItem);
        }
        
        if (hasError) {
          this.value = '';
          filePreview.innerHTML = '';
        } else {
          document.getElementById('fileError').style.display = 'none';
        }
      }
    });
    
    // Category-specific fields
    const categorySelect = document.getElementById('category');
    const additionalFields = document.getElementById('additionalFields');
    
    categorySelect.addEventListener('change', function() {
      additionalFields.innerHTML = '';
      
      // Show different fields based on category
      switch(this.value) {
        case 'billing':
          createAdditionalField('invoiceNumber', 'Invoice Number', 'text');
          createAdditionalField('amount', 'Amount in Dispute', 'number', { min: '0.01', step: '0.01' });
          break;
        case 'service':
          createAdditionalField('serviceDate', 'Service Date', 'date');
          createAdditionalField('serviceType', 'Service Type', 'select', null, ['Installation', 'Repair', 'Consultation']);
          break;
        case 'product':
          createAdditionalField('purchaseDate', 'Purchase Date', 'date');
          createAdditionalField('productModel', 'Product Model', 'text');
          createAdditionalField('warrantyActive', 'Under Warranty', 'checkbox');
          break;
      }
    });
    
    // Function to create additional fields based on category
    function createAdditionalField(id, label, type, attributes = {}, options = []) {
      const fieldDiv = document.createElement('div');
      fieldDiv.className = 'form-group';
      
      const fieldLabel = document.createElement('label');
      fieldLabel.setAttribute('for', id);
      fieldLabel.textContent = label;
      fieldDiv.appendChild(fieldLabel);
      
      if (type === 'select') {
        const select = document.createElement('select');
        select.id = id;
        select.name = id;
        select.className = 'form-control';
        
        // Add default empty option
        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = `-- Select ${label} --`;
        select.appendChild(defaultOption);
        
        // Add options
        options.forEach(optionText => {
          const option = document.createElement('option');
          option.value = optionText.toLowerCase().replace(/\s+/g, '-');
          option.textContent = optionText;
          select.appendChild(option);
        });
        
        fieldDiv.appendChild(select);
      } else {
        const input = document.createElement('input');
        input.type = type;
        input.id = id;
        input.name = id;
        
        if (type !== 'checkbox') {
          input.className = 'form-control';
        }
        
        // Add any additional attributes
        for (const [key, value] of Object.entries(attributes)) {
          input.setAttribute(key, value);
        }
        
        fieldDiv.appendChild(input);
      }
      
      additionalFields.appendChild(fieldDiv);
    }
  });