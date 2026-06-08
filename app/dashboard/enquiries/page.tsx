"use client";

import { useEffect, useState } from "react";

import EnquiryHeader from "@/components/dashboard/sections/enquiries/enquiry-header";
import EnquiryStats from "@/components/dashboard/sections/enquiries/enquiry-stats";
import EnquiryToolbar from "@/components/dashboard/sections/enquiries/enquiry-toolbar";
import EnquiryCard from "@/components/dashboard/sections/enquiries/enquiry-card";
import EnquiryCardSkeleton from "@/components/dashboard/skeleton/enquiry-card";
import EmptyProjects from "@/components/dashboard/sections/projects/empty-card";
import { Button } from "@/components/ui/button";

interface EnquiryItem {
  _id: string;
  name: string;
  email: string;
  message: string;
  isRead: boolean;
  replied: boolean;
  repliedAt?: string | null;
  createdAt: string;
}

interface Pagination {
  totalEnquiries: number;
  totalPages: number;
  currentPage: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

const Enquiries = () => {
  const [enquiries, setEnquiries] = useState<EnquiryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [page, setPage] = useState(1);

  const [pagination, setPagination] = useState<Pagination>({
    totalEnquiries: 0,
    totalPages: 1,
    currentPage: 1,
    limit: 6,
    hasNextPage: false,
    hasPrevPage: false,
  });

  const fetchEnquiries = async () => {
    try {
      setLoading(true);
      const query = new URLSearchParams({
        page: String(page),
        limit: "3",
        search,
      });
      if (activeFilter === "Unread") {
        query.append("isRead", "false");
      }
      if (activeFilter === "Read") {
        query.append("isRead", "true");
      }
      if (activeFilter === "Replied") {
        query.append("replied", "true");
      }
      const response = await fetch(`/api/enquiries?${query.toString()}`);
      if (!response.ok) {
        throw new Error("Failed to fetch enquiries");
      }
      const data = await response.json();
      setEnquiries(data.enquiries || []);
      setPagination(
        data.pagination || {
          totalEnquiries: 0,
          totalPages: 1,
          currentPage: 1,
          limit: 6,
          hasNextPage: false,
          hasPrevPage: false,
        },
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, [page, search, activeFilter]);

  useEffect(() => {
    setPage(1);
  }, [search, activeFilter]);

  const handleDeleteEnquiry = (id: string) => {
    setEnquiries((prev) => prev.filter((item) => item._id !== id));
    setPagination((prev) => ({
      ...prev,
      totalEnquiries: Math.max(0, prev.totalEnquiries - 1),
    }));
    fetchEnquiries();
  };

  return (
    <section className="space-y-8">
      <EnquiryHeader />
      <EnquiryStats />
      <EnquiryToolbar
        search={search}
        setSearch={setSearch}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />
      {loading ? (
        <div className={`grid gap-6 sm:grid-cols-2 xl:grid-cols-3`}>
          {Array.from({
            length: 3,
          }).map((_, index) => (
            <EnquiryCardSkeleton key={index} />
          ))}
        </div>
      ) : enquiries.length === 0 ? (
        <EmptyProjects
          title="No Enquiries Found"
          description="No enquiries match your current search or filters."
          onReset={() => {
            setSearch("");
            setActiveFilter("All");
            setPage(1);
          }}
        />
      ) : (
        <>
          <div className={`grid gap-6 sm:grid-cols-2 xl:grid-cols-3`}>
            {enquiries.map((item) => (
              <EnquiryCard
                key={item._id}
                enquiry={item}
                onDelete={handleDeleteEnquiry}
              />
            ))}
          </div>
          {pagination.totalPages > 1 && (
            <div
              className="
                flex
                flex-wrap
                items-center
                justify-center
                gap-4
                pt-3
              "
            >
              <Button
                variant="outline"
                disabled={!pagination.hasPrevPage}
                onClick={() => setPage((prev) => prev - 1)}
                className="
                  rounded-2xl
                  px-5
                "
              >
                Previous
              </Button>
              <div
                className="
                  rounded-2xl
                  border
                  border-border/50
                  bg-muted/30
                  px-5
                  py-2.5
                  text-sm
                  text-muted-foreground
                "
              >
                Page{" "}
                <span className="font-semibold text-foreground">
                  {pagination.currentPage}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-foreground">
                  {pagination.totalPages}
                </span>
              </div>
              <Button
                variant="outline"
                disabled={!pagination.hasNextPage}
                onClick={() => setPage((prev) => prev + 1)}
                className="
                  rounded-2xl
                  px-5
                "
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default Enquiries;
