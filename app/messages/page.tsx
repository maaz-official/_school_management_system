"use client";

import { useState, useEffect } from "react";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { MessageList } from "@/components/messages/message-list";
import { MessageInput } from "@/components/messages/message-input";
import { UserList } from "@/components/messages/user-list";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { messageApi } from "@/lib/api/messages";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const mockUsers = [
  {
    _id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    role: "Teacher",
  },
  // Add more mock users as needed
];

export default function MessagesPage() {
  const [messages, setMessages] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { toast } = useToast();

  const fetchMessages = async () => {
    if (!selectedUser) return;
    
    try {
      const data = await messageApi.getConversation(selectedUser);
      setMessages(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch messages",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [selectedUser]);

  const handleUserSelect = (userId: string) => {
    setSelectedUser(userId);
    setIsMobileMenuOpen(false);
  };

  return (
    <DashboardShell>
      <DashboardHeader 
        heading="Messages" 
        text="Communicate with students, teachers, and staff"
      />
      <Card className="flex flex-col h-[calc(100vh-12rem)]">
        <Tabs defaultValue="direct" className="flex-1">
          <div className="flex items-center border-b px-4 py-2">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] p-0">
                <div className="h-full py-4">
                  <UserList
                    users={mockUsers}
                    selectedUserId={selectedUser}
                    onUserSelect={handleUserSelect}
                  />
                </div>
              </SheetContent>
            </Sheet>
            <TabsList className="ml-auto">
              <TabsTrigger value="direct">Direct Messages</TabsTrigger>
              <TabsTrigger value="groups">Group Chats</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="direct" className="flex h-[calc(100%-3rem)]">
            <div className="hidden md:block w-1/3 lg:w-1/4 border-r">
              <UserList
                users={mockUsers}
                selectedUserId={selectedUser}
                onUserSelect={setSelectedUser}
              />
            </div>
            
            {selectedUser ? (
              <div className="flex-1 flex flex-col">
                <div className="flex-1 overflow-y-auto">
                  <MessageList messages={messages} />
                </div>
                <MessageInput
                  recipientId={selectedUser}
                  onMessageSent={fetchMessages}
                />
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center text-muted-foreground">
                Select a conversation to start messaging
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="groups" className="flex h-[calc(100%-3rem)]">
            <div className="hidden md:block w-1/3 lg:w-1/4 border-r">
              <UserList
                users={mockUsers}
                selectedUserId={selectedUser}
                onUserSelect={setSelectedUser}
              />
            </div>
            
            {selectedUser ? (
              <div className="flex-1 flex flex-col">
                <div className="flex-1 overflow-y-auto">
                  <MessageList messages={messages} />
                </div>
                <MessageInput
                  groupId={selectedUser}
                  onMessageSent={fetchMessages}
                />
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center text-muted-foreground">
                Select a group to start messaging
              </div>
            )}
          </TabsContent>
        </Tabs>
      </Card>
    </DashboardShell>
  );
}