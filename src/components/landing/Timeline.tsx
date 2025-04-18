"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CalendarDays } from "lucide-react";

export function TimelineSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  // Timeline data
  const timelineEvents = [
    {
      date: "January 15, 2025",
      title: "Registration Opens",
      description:
        "Registration for the UINSA Math Olympiad 2025 begins. Early bird discounts available until January 31st.",
    },
    {
      date: "March 20, 2025",
      title: "Registration Closes",
      description:
        "Last day to register for the competition. All participants must complete their registration by this date.",
    },
    {
      date: "April 5, 2025",
      title: "Preliminary Round",
      description:
        "The first stage of the competition will be conducted online with remote proctoring.",
    },
    {
      date: "April 20, 2025",
      title: "Preliminary Results",
      description:
        "Announcement of participants who qualified for the semifinal round.",
    },
    {
      date: "May 10, 2025",
      title: "Semifinal Round",
      description:
        "The second stage for qualified participants will be held at designated regional centers.",
    },
    {
      date: "May 25, 2025",
      title: "Semifinal Results",
      description:
        "Announcement of participants who qualified for the final round.",
    },
    {
      date: "June 15, 2025",
      title: "Final Round",
      description:
        "The final stage to determine the champions will be held at the Central University Auditorium.",
    },
    {
      date: "June 16, 2025",
      title: "Awards Ceremony",
      description:
        "Ceremony to announce winners and distribute prizes. Open to all participants, parents, and teachers.",
    },
  ];

  return (
    <section
      id="timeline"
      className="py-20 bg-[#f8f4e3]/50 relative overflow-hidden"
    >
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#996515] to-[#d2b48c]">
              Event Timeline
            </span>
          </h2>
          <div className="w-20 h-1 bg-[#996515] mx-auto mb-6"></div>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Mark your calendar with these important dates for the UINSA Math
            Olympiad 2025.
          </p>
        </div>

        <div ref={ref} className="relative max-w-4xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-[#996515]/30 transform md:translate-x-0 translate-x-[7px]"></div>

          {/* Timeline Events */}
          <div className="space-y-12">
            {timelineEvents.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`flex flex-col md:flex-row gap-8 items-start relative ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-0 md:left-1/2 top-0 h-4 w-4 rounded-full bg-[#996515] border-4 border-white transform md:translate-x-[-8px] translate-x-[-1px]"></div>

                {/* Content */}
                <div
                  className={`md:w-1/2 ml-8 md:ml-0 ${
                    index % 2 === 0 ? "md:pr-12" : "md:pl-12"
                  }`}
                >
                  <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-2 text-sm text-[#996515] mb-2">
                      <CalendarDays className="h-4 w-4" />
                      <span>{event.date}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-[#665D1E]">
                      {event.title}
                    </h3>
                    <p className="text-gray-600">{event.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
