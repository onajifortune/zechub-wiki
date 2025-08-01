"use client";
import React, { useState, useEffect } from "react";
import WalletItem from "@/components/Wallet/WalletItem";
import FilterToggle from "@/components/FilterToggle";

interface Wallet {
  title: string;
  url: string;
  imageUrl: string;
  devices: string[];
  pools: string[];
  features: string[];
  syncSpeed: string;
}

interface Props {
  allWallets: Wallet[];
}

const WalletList: React.FC<Props> = ({ allWallets }) => {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [filters, setFilters] = useState({
    Devices: new Set<string>(),
    "Operating System": new Set<string>(),
    Pools: new Set<string>(),
    "Wallet Support": new Set<string>(),
    Features: new Set<string>(),
  });
  const [likes, setLikes] = useState<{ [key: string]: number }>({});
  const [error, setError] = useState<{ [key: string]: string }>({});
  const [success, setSuccess] = useState<{ [key: string]: string }>({});
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const handleToggleFilter = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  useEffect(() => {
    const fetchLikes = async () => {
      const devicesSet = new Set<string>();
      const operatingSystemSet = new Set<string>();
      const poolsSet = new Set<string>();
      const walletSupportSet = new Set<string>();
      const featuresSet = new Set<string>();

      allWallets.forEach((wallet) => {
        wallet.devices.forEach((device) => devicesSet.add(device.trim()));
        wallet.pools.forEach((pool) => poolsSet.add(pool.trim()));
        wallet.features.forEach((feature) => featuresSet.add(feature.trim()));
      });

      setFilters({
        Devices: devicesSet,
        "Operating System": operatingSystemSet,
        Pools: poolsSet,
        "Wallet Support": walletSupportSet,
        Features: featuresSet,
      });

      let initialLikes: { [key: string]: number } = {};
      try {
        const response = await fetch("/api/wallet-likes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title: "", delta: 0 }),
        });

        if (response.ok) {
          initialLikes = await response.json();
        } else {
          console.log("You reviewed this in the past.");
        }
      } catch (error) {
        console.log("Error getting likes: " + error);
      }

      allWallets.forEach((wallet) => {
        if (!initialLikes[wallet.title]) initialLikes[wallet.title] = 0; // Initialize likes to zero
      });
      setLikes(initialLikes);
    };

    fetchLikes();
  }, [allWallets]);

  function toggleFilter(filterCategory: string, filterValue: string) {
    const filterKey = `${filterCategory}:${filterValue}`;
    setActiveFilters((prev) =>
      prev.includes(filterKey)
        ? prev.filter((f) => f !== filterKey)
        : [...prev, filterKey]
    );
  }

  const handleLike = async (walletTitle: string) => {
    setSuccess({});
    setError({}); // Reset error before attempting to like
    try {
      const response = await fetch("/api/wallet-likes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: walletTitle, delta: 1 }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Received message:", data);
        // Update likes state only if the API call was successful
        setLikes((prevLikes) => ({
          ...prevLikes,
          [walletTitle]: prevLikes[walletTitle] + 1,
        }));
        setSuccess({ [walletTitle]: "We saved your review!" });
      } else {
        const data = await response.json();
        setError({ [walletTitle]: data.message });
      }
    } catch (error) {
      setError({ [walletTitle]: "Error updating rating: " + error });
    }
  };

  const handleDislike = async (walletTitle: string) => {
    setSuccess({});
    setError({}); // Reset error before attempting to dislike
    try {
      const response = await fetch("/api/wallet-likes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: walletTitle, delta: -1 }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Received message:", data);
        // Update likes state only if the API call was successful
        setLikes((prevLikes) => ({
          ...prevLikes,
          [walletTitle]: prevLikes[walletTitle] - 1,
        }));
        setSuccess({ [walletTitle]: "We saved your review!" });
      } else {
        const data = await response.json();
        setError({ [walletTitle]: data.message });
      }
    } catch (error) {
      setError({ [walletTitle]: "Error updating rating: " + error });
    }
  };

  const filteredWallets = allWallets.filter((wallet) =>
    activeFilters.every((filter) => {
      const [category, value] = filter.split(":");
      if (category === "Devices") return wallet.devices.includes(value);
      if (category === "Pools") return wallet.pools.includes(value);
      if (category === "Features") return wallet.features.includes(value);
      return false;
    })
  );

  const sortedWallets = filteredWallets.sort(
    (a, b) => likes[b.title] - likes[a.title]
  );

  return (
    <div className="flex flex-col w-full md:flex-row">
      <div className="md:hidden flex justify-between items-center w-full mb-4">
        <h2 className="text-4xl font-bold">Filters</h2>
        <button
          onClick={handleToggleFilter}
          className="bg-[#1984c7] text-white px-4 py-2 rounded text-sm md:text-lg md:hidden"
        >
          Show Navigation
        </button>
      </div>

      <div className="flex gap-2 py-4 flex-wrap md:hidden ">
        {activeFilters?.map((item, index) => {
          return (
            <div
              key={index + 1}
              className="px-2 py-1 rounded-md font-[500] text-sm bg-slate-200 dark:bg-gray-700"
            >
              <p>{item}</p>
            </div>
          );
        })}
      </div>
      <div className="wallet-filter w-full md:w-[20%] relative">
        <div
          className={`md:block md:static fixed  bottom-0 left-0 p-2 w-full bg-white dark:bg-gray-700 ${
            isFilterVisible ? "block" : "hidden"
          }`}
        >
          <button
            onClick={handleToggleFilter}
            className="bg-[#1984c7] absolute right-5 top-5 text-white px-4 py-2 rounded text-sm md:text-lg md:hidden"
          >
            Close
          </button>
          <FilterToggle
            filters={filters}
            activeFilters={activeFilters}
            toggleFilter={toggleFilter}
            handleToggleFilter={handleToggleFilter}
          />
        </div>
      </div>
      <section className="h-auto w-full md:w-[80%]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          {sortedWallets.map((wallet) => (
            <WalletItem
              key={wallet.title}
              title={wallet.title}
              link={wallet.url}
              logo={wallet.imageUrl}
              tags={[
                { category: "Devices", values: [...wallet.devices] },
                { category: "Pools", values: [...wallet.pools] },
                { category: "Features", values: [...wallet.features] },
              ]}
              syncSpeed={wallet.syncSpeed}
              likes={likes[wallet.title]}
              onLike={() => handleLike(wallet.title)}
              onDislike={() => handleDislike(wallet.title)}
              error={error[wallet.title]}
              success={success[wallet.title]}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default WalletList;
