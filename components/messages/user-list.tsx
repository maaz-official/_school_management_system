"use client";

import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

interface UserListProps {
  users: User[];
  selectedUserId?: string;
  onUserSelect: (userId: string) => void;
}

export function UserList({ users, selectedUserId, onUserSelect }: UserListProps) {
  const [search, setSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(users);

  useEffect(() => {
    const filtered = users.filter(
      (user) =>
        user.firstName.toLowerCase().includes(search.toLowerCase()) ||
        user.lastName.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [users, search]);

  return (
    <div className="flex flex-col h-full">
      <div className="relative mb-4">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-8"
        />
      </div>
      
      <ScrollArea className="flex-1">
        <div className="space-y-2">
          {filteredUsers.map((user) => (
            <Button
              key={user._id}
              variant="ghost"
              className={cn(
                "w-full justify-start gap-2",
                selectedUserId === user._id && "bg-muted"
              )}
              onClick={() => onUserSelect(user._id)}
            >
              <Avatar className="h-8 w-8">
                <AvatarImage 
                  src={`https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}`}
                />
                <AvatarFallback>
                  {user.firstName[0]}
                  {user.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start">
                <span className="font-medium">
                  {user.firstName} {user.lastName}
                </span>
                <span className="text-xs text-muted-foreground">
                  {user.role}
                </span>
              </div>
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}