"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Github, Linkedin, Mail, ExternalLink, Loader2 } from "lucide-react";
import type { HeroContent } from "@/lib/content-store";
import { GetAllHero } from "@/src/services/about copy";
import { GetMe } from "@/src/services/singleUser";
import { IUser } from "@/src/types/types";
import Image from "next/image";
export interface User {
  _id: string;
  email: string;
  password: string;
  fullName: string;
  designation: string;
  image: string;
  role: "admin";
  status: "in-progress" | "completed" | "pending";
  createdAt: string;
  updatedAt: string;
  __v: number;
  contactNo: string;
}

export function HeroSection() {
  const [heroContent, setHeroContent] = useState<HeroContent | null>(null);
  const [me, setMe] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAboutContent = async () => {
      try {
        const response = await GetAllHero();
        const me = await GetMe();

        setMe(me?.data);
        setHeroContent(response?.data[0]);
      } catch (error) {
        console.error("Failed to fetch about content:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAboutContent();
  }, []);
console.log(me)
  if (isLoading) {
    return (
      <section className="py-20 px-4">
        <div className="container mx-auto  w-[90%]">
          <div className="flex items-center justify-center h-64">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        </div>
      </section>
    );
  }

  if (!heroContent) {
    return (
      <section className="py-20 px-4">
        <div className="container mx-auto ">
          <div className="text-center">
            <p className="text-muted-foreground">Failed to load hero content</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20  lg:pt-40 px-4">
      <div className="container mx-auto ">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground font-sans">
                {heroContent.name}
              </h1>
              <p className="text-xl text-primary font-medium">
                {heroContent.title}
              </p>
              <p className="text-lg text-muted-foreground font-serif leading-relaxed max-w-2xl">
                {heroContent.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="font-medium">
                <Mail className="w-4 h-4 mr-2" />
                {heroContent.contactButtonText}
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="font-medium bg-transparent"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                {heroContent.researchButtonText}
              </Button>
            </div>

            <div className="flex gap-4">
              <Button variant="ghost" size="icon">
                <Github className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Linkedin className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Mail className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <div className="flex-1 max-w-md">
            <Card className="p-6 bg-card border-border">
              <div className="space-y-4">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <span className="text-4xl font-bold text-primary">
                      <Image
                        src={me?.image || "/default-avatar.png"}
                        alt="User profile picture"
                        width={200}
                        height={200} // height দিতে হবে
                        className="rounded-full object-cover"
                      />
                    </span>
                  </div>
                  <h3 className="font-semibold text-lg">Current Position</h3>
                  <p className="text-sm text-muted-foreground">
                    {heroContent.currentPosition}
                  </p>
                  <p className="text-sm text-primary font-medium">
                    {heroContent.currentOrganization}
                  </p>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-medium mb-2">Research Interests</h4>
                  <div className="flex flex-wrap gap-2">
                    {heroContent.researchInterests.map((interest) => (
                      <span
                        key={interest}
                        className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
