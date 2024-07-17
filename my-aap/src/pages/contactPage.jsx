import React, { useState } from "react";
import { FaMapMarkerAlt, FaEnvelope, FaPhone } from 'react-icons/fa';

function Contact() {
  const [formValues, setFormValues] = useState({ name: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const validate = () => {
    let tempErrors = {};
    if (!formValues.name) tempErrors.name = "Name is required";
    if (!formValues.email) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      tempErrors.email = "Email is invalid";
    }
    if (!formValues.phone) tempErrors.phone = "Phone is required";
    if (!formValues.message) tempErrors.message = "Message is required";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form submitted successfully");
      alert("Form submitted successfully");
      setFormValues({ name: "", email: "", phone: "", message: "" });
    }
  };

  const handleFormReset = () => {
    setFormValues({ name: "", email: "", phone: "", message: "" });
    setErrors({});
  };

  return (
    <div className="contact-us">
      {/* Full-width Image */}
      <div className="full-width-image mt-1">
        <img
          src="https://images.pexels.com/photos/207456/pexels-photo-207456.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt="Contact Us"
          className="w-full h-96 object-cover"
        />
      </div>

      {/* Get in Touch Section */}
      <div className="get-in-touch text-center p-8">
        <h1 className="text-4xl font-bold mb-4">Get in Touch with Us</h1>
        <p className="text-lg mb-8">
          Reach out to us for any questions or support you may need.
        </p>
        <div className="flex flex-col md:flex-row justify-around text-lg space-y-4 md:space-y-0">
          <div className="flex items-center justify-center">
            <FaMapMarkerAlt className="text-2xl mr-2" />
            <span>Kupandol, Lalitpur, Nepal</span>
          </div>
          <div className="flex items-center justify-center">
            <FaEnvelope className="text-2xl mr-2" />
            <span>ehome@example.com</span>
          </div>
          <div className="flex items-center justify-center">
            <FaPhone className="text-2xl mr-2" />
            <span>(977) 98********</span>
          </div>
        </div>
      </div>

      {/* Google Map */}
      <div className="google-map w-full h-96">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3533.062595026163!2d85.31443607511815!3d27.684460176195614!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19b5ad9b8dff%3A0x12a4b82675e789a3!2sPatan%20College%20For%20Professional%20Studies!5e0!3m2!1sen!2snp!4v1720801494532!5m2!1sen!2snp"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Google Map showing the location of Patan College For Professional Studies"
        ></iframe>
      </div>

      {/* Contact Form */}
      <div className="contact-form p-8 bg-gray-50 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">Contact Us Now</h2>
        <form onSubmit={handleSubmit} id="contactForm" className="max-w-lg mx-auto space-y-6">
          <div>
            <label className="block mb-2 text-lg font-semibold">Name</label>
            <input
              onChange={handleChange}
              value={formValues.name}
              type="text"
              name="name"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            />
            {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
          </div>
          <div>
            <label className="block mb-2 text-lg font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={formValues.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            />
            {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
          </div>
          <div>
            <label className="block mb-2 text-lg font-semibold">Phone</label>
            <input
              type="tel"
              name="phone"
              onChange={handleChange}
              value={formValues.phone}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            />
            {errors.phone && <span className="text-red-500 text-sm">{errors.phone}</span>}
          </div>
          <div>
            <label className="block mb-2 text-lg font-semibold">Message</label>
            <textarea
              name="message"
              onChange={handleChange}
              value={formValues.message}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              rows="4"
              required
            ></textarea>
            {errors.message && <span className="text-red-500 text-sm">{errors.message}</span>}
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
            >
              Send Message
            </button>
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded-xl hover:bg-gray-700 transition"
              onClick={handleFormReset}
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Contact;
