"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

import { useUser } from "@/context/UserContext";
import UseHistory from "@/hooks/UseHistory";
import { usePrint, ImageItem } from "@/context/PrintProvider";
import { useIsMobile } from "@/hooks/use-mobile";

import AppSidebar from "@/components/create/SideBar";
import TemplateGrid from "@/components/create/TemplateGrid";
import HistoryTab from "@/components/create/tabs/HistoryTab";
import CartTab from "@/components/create/tabs/CartTab";
import FileUploader from "@/components/create/FileUploader";
import PrintOptions from "@/components/landing/PrintOptions";
import PrintPreview from "@/components/create/PrintPreview";

import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer";
import { TABS, Tab } from "../../lib/constants";

interface TabContentProps {
  tab: Tab;
  media: any[];
  loading: boolean;
  onSelectImage: (img: ImageItem, updateImages?: boolean) => void;
  selectedTab: Tab;
  onSelectTab: (tab: Tab) => void;

}

// Helper for Drawer/Desktop titles
const TabHeader = ({ title }: { title: string }) => (
  <DrawerTitle className="text-xl font-semibold mb-4 text-center">{title}</DrawerTitle>
);

// Mobile tab content
const MobileTabContent = (props: TabContentProps) => {
  const { tab, media, loading, onSelectImage, selectedTab, onSelectTab } = props;

  switch (tab) {
    case "edit":
      return (
        <>
          <TabHeader title="Edit Templates" />
          <TemplateGrid />
        </>
      );
    case "history":
      return <><TabHeader title="History" /><HistoryTab media={media} loading={loading} onSelectImage={onSelectImage} /></>;
    case "print":
      return <><TabHeader title="Choose Print Type" /><PrintOptions variant="tab" selectedTab={selectedTab} onSelectTab={onSelectTab} /></>;
    case "cart":
      return <><TabHeader title="Your Cart" /><CartTab /></>;
    default:
      return null;
  }
};

// Desktop tab content
const DesktopTabContent = (props: TabContentProps) => {
  const { tab, media, loading, onSelectImage, selectedTab, onSelectTab } = props;

  const renderHeader = (text: string) => <h2 className="text-xl text-center font-semibold">{text}</h2>;

  switch (tab) {
    case "edit":
      return <div className="h-screen"><TemplateGrid /></div>;
    case "history":
      return <div className="h-screen"><HistoryTab media={media} loading={loading} onSelectImage={onSelectImage} /></div>;
    case "print":
      return <>{renderHeader("Choose Print Type")}<PrintOptions variant="tab" selectedTab={selectedTab} onSelectTab={onSelectTab} /></>;
    case "cart":
      return <>{renderHeader("Your Cart")}<CartTab /></>;
    default:
      return null;
  }
};

export default function CreatePage() {
  const { user } = useUser();
  const router = useRouter();
  const { history, fetchHistory, loadingHistory } = UseHistory(user?.id);
  const isMobile = useIsMobile();
  const { currentImage, setCurrentImage, imageStack, setImageStack } = usePrint();

  const [loadingUser, setLoadingUser] = useState(true);
  const [selectedTab, setSelectedTab] = useState<Tab>("edit");
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Redirect if not logged in
  useEffect(() => {
    if (user === undefined) return;
    if (!user) router.push("/auth/login");
    else setLoadingUser(false);
  }, [user, router]);

  // Fetch history on mount or user change
  useEffect(() => {
    if (user?.id) fetchHistory();
  }, [user?.id, fetchHistory]);

  // Image select handler
  const handleImageSelect = useCallback(
    (img: ImageItem, updateImages?: boolean) => {
      setCurrentImage(img);
      setImageStack(prev => [...prev, img]);
      if (updateImages) fetchHistory();
    },
    [setCurrentImage, setImageStack, fetchHistory]
  );

  // Undo last change
  const undo = useCallback(() => {
    setImageStack(prev => {
      if (prev.length <= 1) return prev;
      const newStack = prev.slice(0, -1);
      setCurrentImage(newStack[newStack.length - 1] || null);
      return newStack;
    });
  }, [setImageStack, setCurrentImage]);

  const handleRemoveImage = useCallback(() => {
    setCurrentImage(null);
    setImageStack([]);
  }, [setCurrentImage, setImageStack]);

  const handleGetPrint = useCallback(() => {
    if (currentImage) setSelectedTab("print");
  }, [currentImage]);

  if (loadingUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg">Loading...</p>
      </div>
    );

  return (
    <div className="fixed grid w-full  grid-cols-12">
      {/* Sidebar */}
      <div className="col-span-2 md:col-span-1">
        <AppSidebar
          tabs={TABS}
          selectedTab={selectedTab}
          onSelectTab={setSelectedTab}
          toggleDrawer={() => isMobile && setDrawerOpen(true)}
        />
      </div>

      {/* Main Content */}
      {isMobile ? (
        <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
          <DrawerContent className="h-[90%] p-4 overflow-y-auto">
            <MobileTabContent
              tab={selectedTab}
              media={history}
              loading={loadingHistory}
              onSelectImage={handleImageSelect}
              selectedTab={selectedTab}
              onSelectTab={setSelectedTab}
            />
          </DrawerContent>
        </Drawer>
      ) : (
        <div className="grid bg-gradient-to-r from-secondary to-primary-foreground p-4 col-span-5 md:col-span-4 overflow-y-auto">
          <DesktopTabContent
            tab={selectedTab}
            media={history}
            loading={loadingHistory}
            onSelectImage={handleImageSelect}
            selectedTab={selectedTab}
            onSelectTab={setSelectedTab}
          />
        </div>
      )}

      {/* Right Panel */}
      <div className="grid col-span-full md:col-span-6 ">
        {user && (
          <>
            {selectedTab === "print" ? (
              currentImage ? (
                <PrintPreview />
              ) : (
                <div className="flex flex-col items-center justify-center h-full ">
                  <p className="text-gray-500 text-center">
                    Upload an image to get started with your Print
                  </p>
                  <FileUploader  userId={user.id} onUpload={handleImageSelect} />
                </div>
              )
            ) : selectedTab === "edit" || selectedTab === "history" ? (
              <FileUploader  userId={user.id} onUpload={handleImageSelect} />
            ) : selectedTab === "cart" ? (
              <div className="flex items-center justify-center h-full text-gray-500">
                <p>Your cart items will appear here.</p>
              </div>
            ) : null}
          </>
        )}
      </div>

      {/* Action Buttons */}
      {user && currentImage && (selectedTab === "edit" || selectedTab === "history") && (
        <div className="border-l bg-white">
          <div className="flex flex-row lg:flex-col items-center justify-center gap-4 h-full p-4">
            {imageStack.length > 1 && (
              <button
                onClick={undo}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors w-full"
                title="Undo last change"
              >
                Undo
              </button>
            )}
            <button
              onClick={handleGetPrint}
              className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors w-full"
            >
              Get Print
            </button>
            <button
              onClick={handleRemoveImage}
              className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors w-full"
            >
              Remove
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
