import { Suspense } from "react";
import Description from "@/components/description";
import TabsPage from "@/components/TabsPage";
import EditableDescription from "@/components/description";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {/* Main Content */}
      <main className="container mx-auto p-4">
        {/* Description */}
        {/* <div className="mb-8 max-w-4xl">
          <p className="text-gray-700 leading-relaxed">
            <b>
              Help us provide basic necessities to the unhoused members of our
              community.
            </b>{" "}
            We offer a clean place to sit and rest, enjoy a cup of coffee, a
            bowl of cereal and hot food, take a shower with space to clean up,
            and laundry facilities to wash clothes. Of course, we also offer
            intangible resources like guidance navigating county services and
            medical needs. By providing these items you can help those less
            fortunate to start their day with hope. Thank you!
          </p>
          <br />
          <p className="text-sm text-gray-600">
            <b>
              Items can be brought to 1111 H Street (Paul&apos;s Place) between 8AM
              and 1:30PM Monday - Friday.
            </b>{" "}
            Volunteers are available to help unload your car. Please do not ship
            items. Shipped items may not arrive during our open hours and are
            unlikely to get to us. We are happy to give you a donation receipt.
            Questions? Call 530-756-4008
          </p>
        </div> */}
        <EditableDescription />
        <p>{/* adds spacing */}</p>
        <TabsPage />
      </main>
    </Suspense>
  );
}
