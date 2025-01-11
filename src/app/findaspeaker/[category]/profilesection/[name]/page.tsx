"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
} from "../../../../../components/ui/card";
import axios from "axios";

interface Profile {
  name: string;
  tagline: string;
  travelsFrom: string;
  speakingFee: string;
  categories: string[];
  biography: string;
  bookButtonText: string;
  videoLinks: string[];
  image: string;
}

const ProfileSection = () => {
  const params = useParams();
  console.log("Params:", params); // Log params to verify it contains `name`
  const name = params?.name as string | undefined;
  console.log("Extracted name:", name); // Log `name` to see if it's correctly extracted

  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!name) {
        console.warn("Name is undefined, fetchProfile will not proceed.");
        return;
      }

      try {
        setLoading(true);
        console.log("Fetching profile data for name:", name);
        const response = await axios.get(`/api/profilesection/${name}`);
        setProfile(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setError("Failed to load profile data.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [name]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!profile) {
    return <div>No profile found.</div>;
  }

  return (
    <div className="relative">
      <div className="absolute top-0 left-0 w-full h-[400px] bg-[#14394b] -z-10" />
      <div className="max-w-6xl mx-auto px-6 pt-32">
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          <div className="w-48 h-48 relative">
            <img
              src={profile.image}
              alt="Profile"
              className="rounded-full w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h1 className="text-2xl font-bold mb-2 text-[#14394b]">
                {profile.name}
              </h1>
              <p className="text-[#14394b] mb-4">{profile.tagline}</p>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <span className="font-semibold text-[#14394b]">
                    Travels From:
                  </span>
                  <span className="text-gray-600">{profile.travelsFrom}</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-semibold text-[#14394b]">
                    Speaking Fee:
                  </span>
                  <span className="text-gray-600">{profile.speakingFee}</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-semibold text-[#14394b]">
                    Categories:
                  </span>
                  <span className="text-gray-600">
                    {Array.isArray(profile.categories)
                      ? profile.categories.join(", ")
                      : "No categories available"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Card className="mb-12 bg-white shadow-lg">
          <CardHeader>
            <h2 className="text-xl font-bold text-[#14394b]">
              {profile.name} BIOGRAPHY
            </h2>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">{profile.biography}</p>
          </CardContent>
        </Card>

        <div className="text-center mb-12">
          <Link
            href={`/findaspeaker/academicians/requestaspeaker/${profile.name}`}
            className="bg-[#e39075] text-white px-8 py-3 rounded-md hover:bg-[#d27d64] inline-block"
          >
            {profile.bookButtonText}
          </Link>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-6 text-[#14394b]">
            {profile.name} VIDEOS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array.isArray(profile.videoLinks) &&
            profile.videoLinks.length > 0 ? (
              profile.videoLinks.map((link: string, index: number) => (
                <div
                  key={index}
                  className="aspect-video bg-gray-100 rounded-lg overflow-hidden"
                >
                  <iframe
                    className="w-full h-full"
                    src={link}
                    title={`YouTube video player ${index}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No videos available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
