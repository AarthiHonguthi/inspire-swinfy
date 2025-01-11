"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const RequestaSpeaker = () => {
  const params = useParams();
  const name = params?.name as string | undefined;

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
  });

  const [speakerData, setSpeakerData] = useState({
    image: "",
    name: "",
  });

  useEffect(() => {
    if (name) {
      const fetchSpeakerData = async () => {
        try {
          const response = await fetch(`/api/profilesection/${name}`);
          if (!response.ok) throw new Error("Failed to fetch speaker data");

          const result = await response.json();
          if (result.success && result.data) {
            setSpeakerData({
              image: result.data.image || "",
              name: result.data.name || "",
            });
          }
        } catch (error) {
          console.error("Error fetching speaker data:", error);
        }
      };

      fetchSpeakerData();
    }
  }, [name]);

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

    if (!speakerData.name) {
      alert("Speaker data not loaded yet");
      return;
    }

    try {
      const payload = {
        ...formData,
        requestSpeaker: speakerData.name, // Send requestSpeaker only
      };
      console.log(payload);
      const response = await fetch(`/api/requestaspeaker`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

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
        });
      } else {
        const result = await response.json();
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
          className="text-4xl font-bold text-center mb-8 text-[#14394b] "
          style={{ fontFamily: "Playfair Display" }}
        >
          REQUEST YOUR GUEST
        </h1>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="flex">
            <div className="w-1/4">
              <img
                src={speakerData.image || "/api/placeholder/400/400"}
                alt="Speaker"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-3/4 bg-[#486776] p-6">
              <h2 className="text-white text-lg font-semibold mb-2">
                BOOKING INFORMATION REQUEST
              </h2>
              <h3 className="text-white text-xl font-bold mb-2">
                {speakerData.name || "Loading..."}
              </h3>
              <p className="text-white text-sm">
                We are happy to assist you with your interest in booking a
                speaker or celebrity for your event, your organization, and the
                type of talent you would like to secure, and an agent will be in
                touch shortly.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 gap-10 ">
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

// export default RequestaSpeaker;
export default RequestaSpeaker;
