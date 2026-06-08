"use client";

import { useEffect, useState } from "react";

import DSAHeader from "@/components/dashboard/sections/dsa/dsa-header";
import DSAStats from "@/components/dashboard/sections/dsa/dsa-stats";
import DSAToolbar from "@/components/dashboard/sections/dsa/dsa-toolbar";
import DSACard from "@/components/dashboard/sections/dsa/dsa-card";
import DSACardSkeleton from "@/components/dashboard/skeleton/dsa-card";
import EmptyProjects from "@/components/dashboard/sections/projects/empty-card";

import { Button } from "@/components/ui/button";

interface DSAItem {
  _id: string;
  title: string;
  subtitle: string;
  desc: string;
  progress: string;
  category: "leetcode" | "striver" | "codeforces" | "gfg" | "custom";
  problemsSolved: number;
  featured: boolean;
  order: number;
  createdAt?: string;
}

interface Pagination {
  totalProjects: number;
  totalPages: number;
  currentPage: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

const DSA = () => {
  const [dsaList, setDsaList] = useState<DSAItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState<Pagination>({
    totalProjects: 0,
    totalPages: 1,
    currentPage: 1,
    limit: 3,
    hasNextPage: false,
    hasPrevPage: false,
  });

  const fetchDSA = async () => {
    try {
      setLoading(true);
      const query = new URLSearchParams({
        page: String(page),
        limit: "6",
        search,
      });

      if (activeFilter === "featured") {
        query.append("featured", "true");
      } else {
        query.append("category", activeFilter);
      }

      const response = await fetch(`/api/dsa?${query}`);

      if (!response.ok) {
        throw new Error("Failed to fetch DSA entries");
      }

      const data = await response.json();

      setDsaList(data.dsa || []);

      setPagination(data.pagination);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDSA();
  }, [page, search, activeFilter]);

  useEffect(() => {
    setPage(1);
  }, [search, activeFilter]);

  const handleDeleteDSA = (id: string) => {
    setDsaList((prev) => prev.filter((item) => item._id !== id));

    setPagination((prev) => ({
      ...prev,

      totalProjects: prev.totalProjects - 1,
    }));
    fetchDSA();
  };

  return (
    <section className="space-y-8">
      <DSAHeader />
      <DSAStats />
      <DSAToolbar
        search={search}
        setSearch={setSearch}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />
      {loading ? (
        <div className={"grid gap-6 sm:grid-cols-2 xl:grid-cols-3"}>
          {Array.from({ length: 3 }).map((_, index) => (
            <DSACardSkeleton key={index} />
          ))}
        </div>
      ) : dsaList.length === 0 ? (
        <EmptyProjects
          title="No DSA entries found"
          description="Try changing your search or filters to find DSA progress entries."
          onReset={() => {
            setSearch("");
            setActiveFilter("All");
            setPage(1);
          }}
        />
      ) : (
        <>
          <div className={"grid gap-6 sm:grid-cols-2 xl:grid-cols-3"}>
            {dsaList.map((item) => (
              <DSACard key={item._id} dsa={item} onDelete={handleDeleteDSA} />
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

export default DSA;
