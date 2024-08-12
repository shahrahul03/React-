import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../FooterComponent/footerComponent';

const ContactUsComponent = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Message sent successfully!');
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
      } else {
        toast.error('Error sending message. Please try again later.');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error sending message. Please try again later.');
    }
  };

  return (
    <>
      <div className="flex flex-col min-h-screen bg-gray-100">
        <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl w-full bg-white rounded-lg shadow-md overflow-hidden flex flex-col lg:flex-row">
            <div className="w-full lg:w-2/5 bg-gradient-to-b from-red-500 to-red-900  p-8">
              <h2 className="text-2xl font-extrabold text-white mb-6">Let's get in touch</h2>
              <p className="text-green-100 mb-4">We're open for any suggestion or just to have a chat</p>
              <ul className="space-y-4">
                <li className="flex items-center text-green-100">
                  <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M21.71,20.29,18.32,16.9a2,2,0,0,0-1.41-.58H16.07a9.61,9.61,0,0,1-2.74-1.36,9.5,9.5,0,0,1-3.09-3.09,9.61,9.61,0,0,1-1.36-2.74V7.09a2,2,0,0,0-.58-1.41L3.71,2.29A1,1,0,0,0,2,3V6A16.42,16.42,0,0,0,18,22h3a1,1,0,0,0,.71-1.71ZM6,4.41,7.59,6H6ZM19,20H18A14.42,14.42,0,0,1,4,6V4H4.59L19,18.41Z" />
                  </svg>
                  <span>Address: Kathmandu, Nepal</span>
                </li>
                <li className="flex items-center text-green-100">
                  <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12,12a9,9,0,1,0-9-9A9,9,0,0,0,12,12ZM12,2a7,7,0,1,1-7,7A7,7,0,0,1,12,2ZM11,6h2V10H11Zm0,6h2v2H11Z" />
                  </svg>
                  <span>Phone: +977-98544-6548</span>
                </li>
                <li className="flex items-center text-green-100">
                  <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.54,6.42l-9-4.88a3,3,0,0,0-2.9,0l-9,4.88A3,3,0,0,0,1,9V20.11a3,3,0,0,0,3,3H20a3,3,0,0,0,3-3V9A3,3,0,0,0,22.54,6.42ZM12,8a1,1,0,1,1,1-1A1,1,0,0,1,12,8ZM3,9.47l8.77,4.77a1,1,0,0,0,.92,0L21,9.47V20.11a1,1,0,0,1-1,1H4a1,1,0,0,1-1-1ZM20.87,7.3l-8.62,4.69a1,1,0,0,1-.5.14,1,1,0,0,1-.5-.14L3.13,7.3A1,1,0,0,1,3,7V7H21v.06A1,1,0,0,1,20.87,7.3Z" />
                  </svg>
                  <span>Email: ehome@gmail.com</span>
                </li>
                <li className="flex items-center text-green-100">
                  <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.54,2.46a5.8,5.8,0,0,0-4.07-1.61c-1.24,0-2.37.51-3.46,1.1a11.66,11.66,0,0,0-3.5,3.11,11.69,11.69,0,0,0-3.46-3.09C6.83,1.34,5.74.82,4.5.82A5.76,5.76,0,0,0,.42,2.42c-.73.81-1.27,1.79-1.36,2.91A5.45,5.45,0,0,0,0,7.74V21.88a1,1,0,0,0,1,1H21.88a1,1,0,0,0,1-1V7.74a5.47,5.47,0,0,0-1.36-2.91ZM20,20H2V7.74a3.44,3.44,0,0,1,.6-1.87,3.78,3.78,0,0,1,2.66-1.3c.91,0,1.83.42,2.74,1.16a9.85,9.85,0,0,1,2.94,3.2A1,1,0,0,0,12.6,9.27a10.2,10.2,0,0,1,3.05-3.17C17.53,4.57,18.45,4.15,19.36,4.15a3.77,3.77,0,0,1,2.66,1.3A3.42,3.42,0,0,1,22.4,7.74V20Z" />
                  </svg>
                  <span>Website: www.ehome.com</span>
                </li>
              </ul>
            </div>
            <div className="w-full lg:w-3/5 p-8">
              <h2 className="text-2xl font-extrabold text-red-700 mb-6">Get in touch</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="4"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 w-full"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <Footer />
      </div>
      <ToastContainer />
    </>
  );
};

export default ContactUsComponent;
