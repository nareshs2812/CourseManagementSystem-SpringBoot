import React, { useState } from 'react';
import '../styles/ContactPage.css';
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, subject, message } = formData;

    if (!name || !email || !subject || !message) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);

    try {
      await emailjs.send(
        'service_0t2lpwk',    // ✅ Your EmailJS service ID
        'template_ygkrlwx',   // ✅ Your EmailJS template ID
        {
          title: subject,     // Matches {{title}}
          name: name,         // Matches {{name}}
          email: email,       // Matches {{email}}
          message: message    // Matches {{message}}
        },
        'UrM3oMXghg5fWXezm'   // ✅ Your EmailJS Public Key
      );

      toast.success('Message sent successfully!');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      toast.error('Failed to send message!');
      console.error('EmailJS Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-container">
      <h2>Contact Us</h2>
      <form className="contact-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={formData.subject}
          onChange={handleChange}
          required
        />

        <textarea
          name="message"
          placeholder="Your Message"
          rows="6"
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>

        <button type="submit" disabled={loading}>
          {loading ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
}

export default ContactPage;
