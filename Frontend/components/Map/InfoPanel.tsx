"use client";

import React, { useState } from "react";
import { X, Minus, ChevronDown, ChevronUp } from "lucide-react";

type Props = {
  selectedPlot: any;
  onClose?: () => void;
  onMinimize?: () => void;
};

export default function InfoPanel({ selectedPlot, onClose, onMinimize }: Props) {
  const [openSection, setOpenSection] = useState<string | null>(null);
 const [isMinimized, setIsMinimized] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  if (!selectedPlot) {
    return (
      <div className="absolute right-6 top-6 w-96 bg-white border border-gray-200 shadow-lg rounded-lg p-4 z-50 text-black">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-semibold">Property Info</h3>
          <div className="flex items-center gap-2">
            <button onClick={() => onMinimize?.()} className="p-1 rounded hover:bg-gray-100">
              <Minus className="w-4 h-4" />
            </button>
            <button onClick={() => onClose?.()} className="p-1 rounded hover:bg-gray-100">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
        <p className="text-sm text-gray-600">Select a plot on the map to view detailed information.</p>
      </div>
    );
  }

  return (
<aside className="absolute top-6 left-1/2 transform -translate-x-[90%] w-[500px] max-w-[95vw] bg-white border border-gray-200 shadow-2xl rounded-lg overflow-hidden z-50 text-black">

      {/* Header */}
      <div className="flex justify-between items-start p-4 border-b">
        <div>
          <h3 className="text-lg font-semibold">{selectedPlot.name}</h3>
          <p className="text-xs text-gray-700">
            Land lying to the west of Noborough Lodge, Brockhall, Northampton (NN7 4LA)
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => onMinimize?.()} className="p-1 rounded hover:bg-gray-100">
            <Minus className="w-4 h-4 text-black" />
          </button>
          <button onClick={() => onClose?.()} className="p-1 rounded hover:bg-gray-100">
            <X className="w-4 h-4 text-black" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 overflow-y-auto max-h-[78vh] space-y-3">
        {[
          {
            title: "Property Info",
            content: (
              <div className="space-y-2">
                <div><strong>ID:</strong> NN329156</div>
                <div><strong>Approval Feasibility:</strong> Low</div>
                <div><strong>Area:</strong> 100.66 Acres</div>
                <div><strong>Tenure:</strong> Freehold</div>
              </div>
            ),
          },
          {
            title: "Ownership / Price History",
            content: (
              <div className="space-y-2">
                {[{
                  price: "£ 730,000",
                  date: "12/17/2019",
                  type: "detached",
                  tenure: "Freehold",
                  newBuild: "No",
                },{
                  price: "£ 650,000",
                  date: "5/21/2012",
                  type: "detached",
                  tenure: "Freehold",
                  newBuild: "No",
                }].map((item, idx) => (
                  <div key={idx} className="border rounded p-3 shadow-sm bg-gray-50">
                    <div className="font-semibold">{item.price}</div>
                    <div>Date: {item.date}</div>
                    <div>Property Type: {item.type}</div>
                    <div>Tenure: {item.tenure}</div>
                    <div>New Build: {item.newBuild}</div>
                  </div>
                ))}
              </div>
            ),
          },
          {
            title: "Planning Attributes",
            content: (
              <div className="space-y-2">
                <div>Land Classification</div>
                <div>Flood Risk Zones</div>
                <div>Listed Buildings</div>
              </div>
            ),
          },
          {
            title: "Property Market",
            content: (
              <div className="space-y-2">
                <div><strong>Postcode District:</strong> NN11</div>
                <div><strong>Average Price:</strong> £ 326,795</div>
                <div><strong>Price per Sq Ft:</strong> £ 296</div>
                <div><strong>Average Rent:</strong> £ 240</div>
                <div><strong>Sales per Month:</strong> 37</div>

                <div className="mt-2">
                  <div className="font-semibold mb-1">Average Price Over Time (placeholder chart)</div>
                  <div className="h-24 bg-gray-200 rounded flex items-center justify-center text-gray-500">Chart here</div>
                </div>

                <div className="mt-2">
                  <div className="font-semibold mb-1">Growth & Performance</div>
                  {[
                    { label: "Average Yield", value: 82.7 },
                    { label: "1 Year Growth", value: 68.5 },
                    { label: "3 Year Growth", value: 51.2 },
                    { label: "5 Year Growth", value: 39.7 },
                    { label: "7 Year Growth", value: 20.1 },
                  ].map((item, idx) => (
                    <div key={idx} className="mb-1">
                      <div className="flex justify-between text-xs">
                        <span>{item.label}</span>
                        <span>{item.value}%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded">
                        <div
                          className="h-2 bg-blue-500 rounded"
                          style={{ width: `${Math.max(item.value, 0)}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ),
          },
          {
            title: "Area Stats",
            content: (
              <div className="space-y-2">
                <div><strong>Population 1 Mile:</strong> 27,250</div>
                <div><strong>Age Distribution:</strong> 18</div>
                <div><strong>Education:</strong> 82%</div>
                <div className="w-full h-2 bg-gray-200 rounded mb-2">
                  <div className="h-2 bg-green-500 rounded" style={{ width: "82%" }}></div>
                </div>
                <div><strong>Health Index:</strong> 44%</div>
                <div className="w-full h-2 bg-gray-200 rounded mb-2">
                  <div className="h-2 bg-red-500 rounded" style={{ width: "44%" }}></div>
                </div>
                <div><strong>Crime Rating:</strong> Low</div>

                <div className="mt-2 font-semibold">Occupational Distribution</div>
                {[
                  { label: "Lower managerial", value: 93 },
                  { label: "Higher managerial", value: 79 },
                  { label: "Small employers", value: 69 },
                  { label: "Routine", value: 53 },
                  { label: "Intermediate", value: 41 },
                  { label: "Semi-routine", value: 29 },
                  { label: "Lower supervisory", value: 13 },
                  { label: "Never worked", value: 5 },
                ].map((item, idx) => (
                  <div key={idx} className="mb-1">
                    <div className="flex justify-between text-xs">
                      <span>{item.label}</span>
                      <span>{item.value}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded">
                      <div className="h-2 bg-purple-500 rounded" style={{ width: `${item.value}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            ),
          },
          {
            title: "Local Economy",
            content: (
              <div className="space-y-2">
                <div className="font-semibold">Industry Distribution (1 mile)</div>
                {[
                  { label: "Health", value: 94 },
                  { label: "Manufacturing", value: 82 },
                  { label: "Education", value: 79 },
                  { label: "Retail", value: 68 },
                  { label: "Business admin", value: 57 },
                  { label: "Professional", value: 47 },
                  { label: "Accommodation", value: 37 },
                  { label: "Transport", value: 27 },
                  { label: "Wholesale", value: 15 },
                  { label: "Construction", value: 4 },
                  { label: "Arts & other services", value: 14 },
                  { label: "Public admin", value: 24 },
                  { label: "Info & comm", value: 33 },
                  { label: "Motor trades", value: 42 },
                  { label: "Property", value: 52 },
                  { label: "Agriculture", value: 62 },
                  { label: "Financial", value: 71 },
                  { label: "Mining", value: 81 },
                ].map((item, idx) => (
                  <div key={idx} className="mb-1">
                    <div className="flex justify-between text-xs">
                      <span>{item.label}</span>
                      <span>{item.value}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded">
                      <div className="h-2 bg-orange-500 rounded" style={{ width: `${item.value}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            ),
          },
          {
            title: "Build Cost Estimator",
            content: (
              <div className="space-y-2">
                <div>Choose project type: New Build / Light Refurb / Heavy Refurb / Moderate Refurb</div>
                <div>Internal square feet area: 1,200 sq ft</div>
                <div>Choose finish quality: Basic / Medium / Premium</div>
                <div className="mt-2 p-3 bg-gray-50 border rounded shadow-sm text-center">Calculate Build Costs</div>
              </div>
            ),
          },
        ].map((section) => (
          <div key={section.title} className="border rounded">
            <button
              onClick={() => toggleSection(section.title)}
              className="w-full px-3 py-2 flex justify-between items-center text-left font-medium hover:bg-gray-100"
            >
              {section.title}
              {openSection === section.title ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {openSection === section.title && <div className="p-3 bg-gray-50">{section.content}</div>}
          </div>
        ))}
      </div>
    </aside>
  );
} 
