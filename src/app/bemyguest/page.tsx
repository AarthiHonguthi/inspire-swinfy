"use client";

import React, { useState } from "react";

const BeMyGuest = () => {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    organization: "",
    position: "",
    eventLocation: "",
    bookingFor: "",
    eventDescription: "",
    requestSpeaker: "", // New field added
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      console.log(formData);
      const response = await fetch(`/api/requestaspeaker`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();

      if (response.ok) {
        alert("Request submitted successfully!");
        setFormData({
          email: "",
          firstName: "",
          lastName: "",
          phone: "",
          organization: "",
          position: "",
          eventLocation: "",
          bookingFor: "",
          eventDescription: "",
          requestSpeaker: "", // Reset the new field
        });
      } else {
        alert(`Failed to submit: ${result.message || "Error"}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit the request.");
    }
  };

  return (
    <div className="pt-40 flex justify-center h-full">
      <div className="w-full max-w-5xl">
        <h1
          className="text-4xl font-bold text-center mb-8 text-[#14394b]"
          style={{ fontFamily: "Playfair Display" }}
        >
          We’d Love to Hear From You
        </h1>
        <p className="text-center text-lg mb-8 text-[#14394b]">
          We're here to assist you! Whether you have questions, feedback, or
          need support, feel free to reach out to us. Simply fill out the form
          below or use the contact details provided, and we'll get back to you
          as soon as possible.
        </p>

        <div className="mt-8 gap-10">
          <div className="p-8 bg-[#212a31]">
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                name="email"
                placeholder="Email:"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-4 bg-[#e0e5e8] rounded border-none placeholder-[#486776] text-[#1a3b50]"
                required
              />
              <input
                type="text"
                name="firstName"
                placeholder="First Name:"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full p-4 bg-[#e0e5e8] rounded border-none placeholder-[#486776] text-[#1a3b50]"
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name:"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full p-4 bg-[#e0e5e8] rounded border-none placeholder-[#486776] text-[#1a3b50]"
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone:"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-4 bg-[#e0e5e8] rounded border-none placeholder-[#486776] text-[#1a3b50]"
                required
              />
              <input
                type="text"
                name="requestSpeaker"
                placeholder="Request Speaker:"
                value={formData.requestSpeaker}
                onChange={handleChange}
                className="w-full p-4 bg-[#e0e5e8] rounded border-none placeholder-[#486776] text-[#1a3b50]"
                required
              />
              <input
                type="text"
                name="organization"
                placeholder="Organization:"
                value={formData.organization}
                onChange={handleChange}
                className="w-full p-4 bg-[#e0e5e8] rounded border-none placeholder-[#486776] text-[#1a3b50]"
                required
              />
              <input
                type="text"
                name="position"
                placeholder="Position:"
                value={formData.position}
                onChange={handleChange}
                className="w-full p-4 bg-[#e0e5e8] rounded border-none placeholder-[#486776] text-[#1a3b50]"
                required
              />
              <input
                type="text"
                name="eventLocation"
                placeholder="Event Location:"
                value={formData.eventLocation}
                onChange={handleChange}
                className="w-full p-4 bg-[#e0e5e8] rounded border-none placeholder-[#486776] text-[#1a3b50]"
                required
              />
              <textarea
                name="bookingFor"
                placeholder="What is Booking For?"
                rows={4}
                value={formData.bookingFor}
                onChange={handleChange}
                className="w-full p-4 bg-[#e0e5e8] rounded border-none placeholder-[#486776] resize-none text-[#1a3b50]"
                required
              />
              <textarea
                name="eventDescription"
                placeholder="Brief Description About the Event:"
                rows={6}
                value={formData.eventDescription}
                onChange={handleChange}
                className="w-full p-4 bg-[#e0e5e8] rounded border-none placeholder-[#486776] resize-none text-[#1a3b50]"
                required
              />

              <div className="text-center">
                <button
                  type="submit"
                  className="bg-[#e0e5e8] text-[#1a3b50] px-12 py-3 rounded font-semibold hover:bg-opacity-90 transition-colors"
                >
                  SUBMIT
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeMyGuest;
