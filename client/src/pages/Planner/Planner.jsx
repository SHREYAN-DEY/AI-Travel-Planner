import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import {
  MapPinned,
  Route,
  MapPin,
  Loader2,
  CheckCircle2,
} from "lucide-react";

import DestinationInput from "../../components/planner/DestinationInput";
import DateSelector from "../../components/planner/DateSelector";
import TripDetails from "../../components/planner/TripDetails";
import TravelStyleSelector from "../../components/planner/TravelStyleSelector";
import BudgetSelector from "../../components/planner/BudgetSelector";
import InterestSelector from "../../components/planner/InterestSelector";

function Planner() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    duration: "",
    numTravelers: "",
    travelStyle: "",
    interests: [],
    budgetMin: "",
    budgetMax: "",
  });

  //  DATE DURATION 

  const calculateDuration = (startDate, endDate) => {
    if (!startDate || !endDate) return "";

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (
      Number.isNaN(start.getTime()) ||
      Number.isNaN(end.getTime())
    ) {
      return "";
    }

    if (end < start) return "";

    const difference =
      Math.ceil(
        (end.getTime() - start.getTime()) /
          (1000 * 60 * 60 * 24)
      ) + 1;

    return difference;
  };

  //  FORM CHANGE 

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const updatedData = {
        ...prev,
        [name]: value,
      };

      // Automatically calculate total trip duration
      // from start date and end date.
      if (name === "startDate" || name === "endDate") {
        const startDate =
          name === "startDate"
            ? value
            : prev.startDate;

        const endDate =
          name === "endDate"
            ? value
            : prev.endDate;

        updatedData.duration = calculateDuration(
          startDate,
          endDate
        );
      }

      return updatedData;
    });
  };

  //  INTEREST CHANGE 

  const handleInterestChange = (interest) => {
    setFormData((prev) => ({
      ...prev,

      interests: prev.interests.includes(interest)
        ? prev.interests.filter(
            (item) => item !== interest
          )
        : [...prev.interests, interest],
    }));
  };

  //  GENERATE LOCAL ITINERARY  

  const generateLocalItinerary = () => {
    const destination = formData.destination.trim();

    const interests = formData.interests.map((item) =>
      String(item).toLowerCase()
    );

    const duration = Math.max(
      1,
      Math.min(Number(formData.duration) || 1, 30)
    );

    const hasFood = interests.some((item) =>
      item.includes("food")
    );

    const hasNature = interests.some((item) =>
      item.includes("nature")
    );

    const hasBeach = interests.some((item) =>
      item.includes("beach")
    );

    const hasCulture =
      interests.some((item) =>
        item.includes("culture")
      ) ||
      interests.some((item) =>
        item.includes("history")
      );

    const hasAdventure = interests.some((item) =>
      item.includes("adventure")
    );

    const hasShopping = interests.some((item) =>
      item.includes("shopping")
    );

    const itinerary = Array.from(
      { length: duration },
      (_, index) => {
        const dayNumber = index + 1;

        //  MORNING 

        let morningTitle = `Explore ${destination}`;

        let morningDescription = `Start your day by exploring popular attractions and discovering the highlights of ${destination}.`;

        if (hasNature && dayNumber % 2 === 0) {
          morningTitle = "Nature & Scenic Exploration";

          morningDescription = `Visit beautiful natural surroundings around ${destination} and enjoy a peaceful outdoor experience.`;
        }

        if (hasBeach && dayNumber % 2 === 0) {
          morningTitle = "Beach & Coastal Exploration";

          morningDescription = `Enjoy the coastline, relax by the water and explore scenic coastal locations around ${destination}.`;
        }

        if (hasAdventure && dayNumber % 2 === 1) {
          morningTitle = "Adventure Experience";

          morningDescription = `Start the day with an exciting adventure activity and discover ${destination} from a different perspective.`;
        }

        //  AFTERNOON 

        let afternoonTitle = "Local Food Experience";

        let afternoonDescription = `Enjoy local cuisine and experience the atmosphere of ${destination}.`;

        if (hasFood) {
          afternoonTitle = "Local Food Experience";

          afternoonDescription = `Try popular local dishes and explore food spots while experiencing the flavours of ${destination}.`;
        }

        if (hasCulture && dayNumber % 2 === 0) {
          afternoonTitle = "Culture & Heritage";

          afternoonDescription = `Discover the history, traditions and cultural attractions of ${destination}.`;
        }

        if (hasShopping && dayNumber % 3 === 0) {
          afternoonTitle = "Shopping & Local Markets";

          afternoonDescription = `Explore popular markets and shopping areas in ${destination} and discover local products and souvenirs.`;
        }

        //  EVENING 

        let eveningTitle = "Sightseeing & Photography";

        let eveningDescription = `Spend the evening exploring scenic locations, enjoying the surroundings and capturing memorable moments.`;

        if (hasBeach) {
          eveningTitle = "Sunset & Relaxation";

          eveningDescription = `Enjoy a relaxing evening and watch the sunset while taking in the beautiful surroundings of ${destination}.`;
        }

        if (hasFood && dayNumber % 2 === 0) {
          eveningTitle = "Dinner & Local Experience";

          eveningDescription = `Enjoy a memorable dinner and experience the local atmosphere of ${destination}.`;
        }

        if (hasAdventure && dayNumber % 3 === 0) {
          eveningTitle = "Evening Adventure";

          eveningDescription = `Enjoy an exciting evening activity and make the most of your adventure in ${destination}.`;
        }

        return {
          day: dayNumber,

          morning: {
            time: "09:00 AM",
            title: morningTitle,
            description: morningDescription,
          },

          afternoon: {
            time: "01:00 PM",
            title: afternoonTitle,
            description: afternoonDescription,
          },

          evening: {
            time: "05:00 PM",
            title: eveningTitle,
            description: eveningDescription,
          },
        };
      }
    );

    return itinerary;
  };

  //  GET SAVED TRIPS SAFELY 

  const getSavedTrips = () => {
    try {
      const savedTrips = JSON.parse(
        localStorage.getItem("savedTrips") || "[]"
      );

      return Array.isArray(savedTrips)
        ? savedTrips
        : [];
    } catch (error) {
      console.error(
        "Unable to read saved trips:",
        error
      );

      return [];
    }
  };

  //  SUBMIT 

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    //  REQUIRED FIELD VALIDATION 

    if (!formData.destination.trim()) {
      alert("Please enter your destination.");
      return;
    }

    if (!formData.startDate) {
      alert("Please select your start date.");
      return;
    }

    if (!formData.endDate) {
      alert("Please select your end date.");
      return;
    }

    if (!formData.numTravelers) {
      alert("Please enter the number of travelers.");
      return;
    }

    if (!formData.travelStyle) {
      alert("Please select your travel style.");
      return;
    }

    if (!formData.budgetMin || !formData.budgetMax) {
      alert("Please select your budget range.");
      return;
    }

    if (formData.interests.length === 0) {
      alert("Please select at least one interest.");
      return;
    }

    //  DATE VALIDATION 

    const startDate = new Date(formData.startDate);
    const endDate = new Date(formData.endDate);

    if (
      Number.isNaN(startDate.getTime()) ||
      Number.isNaN(endDate.getTime())
    ) {
      alert("Please select valid travel dates.");
      return;
    }

    if (endDate < startDate) {
      alert("End date cannot be before start date.");
      return;
    }


    //  CALCULATE FINAL DURATION 

    const calculatedDuration = calculateDuration(
      formData.startDate,
      formData.endDate
    );

    if (!calculatedDuration) {
      alert("Please select valid travel dates.");
      return;
    }

    //  BUDGET VALIDATION 

    const minBudget = Number(formData.budgetMin);
    const maxBudget = Number(formData.budgetMax);

    if (
      !Number.isNaN(minBudget) &&
      !Number.isNaN(maxBudget) &&
      minBudget > maxBudget
    ) {
      alert(
        "Minimum budget cannot be greater than maximum budget."
      );
      return;
    }

    try {
      setLoading(true);

      // Small delay for a smoother AI-generation experience
      await new Promise((resolve) =>
        setTimeout(resolve, 1000)
      );

      // Make sure itinerary always uses the
      // automatically calculated duration.

      const finalFormData = {
        ...formData,
        duration: calculatedDuration,
      };

      const itinerary = generateLocalItineraryWithDuration(
        finalFormData
      );

      const trip = {
        id: Date.now(),

        destination: formData.destination.trim(),

        startDate: formData.startDate,

        endDate: formData.endDate,

        duration: calculatedDuration,

        numTravelers: formData.numTravelers,

        travelStyle: formData.travelStyle,

        interests: [...formData.interests],

        budgetMin: formData.budgetMin,

        budgetMax: formData.budgetMax,

        itinerary,

        createdAt: new Date().toISOString(),
      };

      //  SAVE TRIP LOCALLY 

      const existingTrips = getSavedTrips();

      const updatedTrips = [
        trip,
        ...existingTrips,
      ];

      localStorage.setItem(
        "savedTrips",
        JSON.stringify(updatedTrips)
      );

      //  OPEN ITINERARY 

      navigate("/itinerary", {
        state: trip,
      });

    } catch (error) {
      console.error(
        "Trip generation error:",
        error
      );

      alert(
        "Unable to create your trip. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  //  GENERATE ITINERARY WITH FINAL DURATION 

  const generateLocalItineraryWithDuration = (
    currentFormData
  ) => {
    const destination =
      currentFormData.destination.trim();

    const interests = currentFormData.interests.map(
      (item) => String(item).toLowerCase()
    );

    const duration = Math.max(
      1,
      Math.min(
        Number(currentFormData.duration) || 1,
        30
      )
    );

    const hasFood = interests.some((item) =>
      item.includes("food")
    );

    const hasNature = interests.some((item) =>
      item.includes("nature")
    );

    const hasBeach = interests.some((item) =>
      item.includes("beach")
    );

    const hasCulture =
      interests.some((item) =>
        item.includes("culture")
      ) ||
      interests.some((item) =>
        item.includes("history")
      );

    const hasAdventure = interests.some((item) =>
      item.includes("adventure")
    );

    const hasShopping = interests.some((item) =>
      item.includes("shopping")
    );

    const itinerary = Array.from(
      { length: duration },
      (_, index) => {
        const dayNumber = index + 1;

        //  MORNING 

        let morningTitle = `Explore ${destination}`;

        let morningDescription = `Start your day by exploring popular attractions and discovering the highlights of ${destination}.`;

        if (hasNature && dayNumber % 2 === 0) {
          morningTitle = "Nature & Scenic Exploration";

          morningDescription = `Visit beautiful natural surroundings around ${destination} and enjoy a peaceful outdoor experience.`;
        }

        if (hasBeach && dayNumber % 2 === 0) {
          morningTitle = "Beach & Coastal Exploration";

          morningDescription = `Enjoy the coastline, relax by the water and explore scenic coastal locations around ${destination}.`;
        }

        if (hasAdventure && dayNumber % 2 === 1) {
          morningTitle = "Adventure Experience";

          morningDescription = `Start the day with an exciting adventure activity and discover ${destination} from a different perspective.`;
        }

        //  AFTERNOON 

        let afternoonTitle = "Local Food Experience";

        let afternoonDescription = `Enjoy local cuisine and experience the atmosphere of ${destination}.`;

        if (hasFood) {
          afternoonTitle = "Local Food Experience";

          afternoonDescription = `Try popular local dishes and explore food spots while experiencing the flavours of ${destination}.`;
        }

        if (hasCulture && dayNumber % 2 === 0) {
          afternoonTitle = "Culture & Heritage";

          afternoonDescription = `Discover the history, traditions and cultural attractions of ${destination}.`;
        }

        if (hasShopping && dayNumber % 3 === 0) {
          afternoonTitle = "Shopping & Local Markets";

          afternoonDescription = `Explore popular markets and shopping areas in ${destination} and discover local products and souvenirs.`;
        }

        //  EVENING 

        let eveningTitle = "Sightseeing & Photography";

        let eveningDescription = `Spend the evening exploring scenic locations, enjoying the surroundings and capturing memorable moments.`;

        if (hasBeach) {
          eveningTitle = "Sunset & Relaxation";

          eveningDescription = `Enjoy a relaxing evening and watch the sunset while taking in the beautiful surroundings of ${destination}.`;
        }

        if (hasFood && dayNumber % 2 === 0) {
          eveningTitle = "Dinner & Local Experience";

          eveningDescription = `Enjoy a memorable dinner and experience the local atmosphere of ${destination}.`;
        }

        if (hasAdventure && dayNumber % 3 === 0) {
          eveningTitle = "Evening Adventure";

          eveningDescription = `Enjoy an exciting evening activity and make the most of your adventure in ${destination}.`;
        }

        return {
          day: dayNumber,

          morning: {
            time: "09:00 AM",
            title: morningTitle,
            description: morningDescription,
          },

          afternoon: {
            time: "01:00 PM",
            title: afternoonTitle,
            description: afternoonDescription,
          },

          evening: {
            time: "05:00 PM",
            title: eveningTitle,
            description: eveningDescription,
          },
        };
      }
    );

    return itinerary;
  };

  //  UI 

  return (
    <Layout>
      <div className="min-h-screen w-full overflow-x-hidden bg-gray-50">

        <main className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">

          {/*  HEADER  */}

          <div className="mx-auto mb-8 max-w-3xl text-center sm:mb-10">

            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-200">
              <MapPinned size={27} />
            </div>

            <h1 className="break-words text-3xl font-extrabold tracking-tight text-gray-950 sm:text-4xl md:text-5xl">
              Plan Your Perfect Trip
            </h1>

            <p className="mx-auto mt-4 max-w-2xl break-words text-sm leading-6 text-gray-600 sm:text-base sm:leading-7">
              Tell us about your destination, budget and interests.
              We'll create a personalized itinerary for you.
            </p>

            {/* Small info badge */}

            <div className="mt-5 inline-flex max-w-full items-center gap-2 rounded-full border border-indigo-100 bg-white px-4 py-2 text-xs font-medium text-indigo-600 shadow-sm">

              <MapPin
                size={14}
                className="shrink-0"
              />

              <span className="truncate">
                Smart AI Travel Planner
              </span>

            </div>

          </div>

          {/*  FORM CARD  */}

          <div className="w-full overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:rounded-3xl sm:p-8 md:p-10">

            <form
              onSubmit={handleSubmit}
              className="w-full space-y-8"
            >

              {/* Destination */}

              <DestinationInput
                value={formData.destination}
                onChange={handleChange}
              />

              {/* Dates */}

              <DateSelector
                startDate={formData.startDate}
                endDate={formData.endDate}
                onChange={handleChange}
              />

              {/* Trip Details */}

              <TripDetails
                duration={formData.duration}
                numTravelers={formData.numTravelers}
                onChange={handleChange}
              />

              {/* Travel Style */}

              <TravelStyleSelector
                value={formData.travelStyle}
                onChange={handleChange}
              />

              {/* Budget */}

              <BudgetSelector
                budgetMin={formData.budgetMin}
                budgetMax={formData.budgetMax}
                onChange={handleChange}
              />

              {/* Interests */}

              <InterestSelector
                selectedInterests={formData.interests}
                onChange={handleInterestChange}
              />

              {/*  GENERATE BUTTON  */}

              <div className="border-t border-gray-100 pt-6">

                <button
                  type="submit"
                  disabled={loading}
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-4 text-sm font-bold !text-white shadow-lg shadow-indigo-200 transition-all duration-200 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:bg-indigo-600"
                >

                  {loading ? (
                    <>
                      <Loader2
                        size={20}
                        className="shrink-0 animate-spin !text-white"
                      />

                      <span className="!text-white">
                        Creating Your Itinerary...
                      </span>
                    </>
                  ) : (
                    <>
                      <Route
                        size={20}
                        className="shrink-0 !text-white"
                      />

                      <span className="!text-white">
                        Generate My Trip
                      </span>
                    </>
                  )}

                </button>

                {/* Helper text */}

                <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-gray-500">

                  <span className="inline-flex items-center gap-1.5">

                    <CheckCircle2
                      size={14}
                      className="text-indigo-600"
                    />

                    Personalized itinerary

                  </span>

                  <span className="inline-flex items-center gap-1.5">

                    <CheckCircle2
                      size={14}
                      className="text-indigo-600"
                    />

                    Saved automatically

                  </span>

                  <span className="inline-flex items-center gap-1.5">

                    <CheckCircle2
                      size={14}
                      className="text-indigo-600"
                    />

                    No backend required

                  </span>

                </div>

              </div>

            </form>

          </div>

        </main>

      </div>
    </Layout>
  );
}

export default Planner;