"use client";

import { useEffect, useRef } from "react";
import { format } from "date-fns";
import { Message } from "@/lib/api/messages";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Paperclip, Check, CheckCheck } from "lucide-react";

interface MessageListProps {
  messages: Message[];
  onLoadMore?: () => void;
}

export function MessageList({ messages, onLoadMore }: MessageListProps) {
  const { user } = useAuth();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (container.scrollTop === 0 && onLoadMore) {
        onLoadMore();
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [onLoadMore]);

  const isMessageRead = (message: Message) => {
    return message.read.length > 0;
  };

  const isMessageDelivered = (message: Message) => {
    return message.sender._id !== user?.id;
  };

  return (
    <div ref={containerRef} className="flex flex-col space-y-4 p-4 overflow-y-auto">
      {messages.map((message, index) => {
        const showAvatar = index === 0 || 
          messages[index - 1].sender._id !== message.sender._id;
        
        return (
          <div
            key={message._id}
            className={cn(
              "flex gap-2",
              message.sender._id === user?.id ? "justify-end" : "justify-start"
            )}
          >
            {message.sender._id !== user?.id && showAvatar && (
              <Avatar className="h-8 w-8">
                <AvatarImage 
                  src={`https://ui-avatars.com/api/?name=${message.sender.firstName}+${message.sender.lastName}`} 
                />
                <AvatarFallback>
                  {message.sender.firstName[0]}
                  {message.sender.lastName[0]}
                </AvatarFallback>
              </Avatar>
            )}
            <div className={cn(
              "flex flex-col",
              message.sender._id === user?.id ? "items-end" : "items-start"
            )}>
              {showAvatar && (
                <span className="text-sm text-muted-foreground mb-1">
                  {message.sender.firstName} {message.sender.lastName}
                </span>
              )}
              <div className="flex items-end gap-2">
                <Card
                  className={cn(
                    "px-4 py-2 max-w-md break-words",
                    message.sender._id === user?.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  )}
                >
                  {message.replyTo && (
                    <div className="text-sm border-l-2 border-primary pl-2 mb-2 opacity-70">
                      {message.replyTo.content}
                    </div>
                  )}
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  {message.attachments.length > 0 && (
                    <div className="flex items-center gap-2 mt-2">
                      <Paperclip className="h-4 w-4" />
                      <span className="text-xs">
                        {message.attachments.length} attachment(s)
                      </span>
                    </div>
                  )}
                </Card>
                {message.sender._id === user?.id && (
                  <div className="flex items-center text-muted-foreground">
                    {isMessageRead(message) ? (
                      <CheckCheck className="h-4 w-4" />
                    ) : isMessageDelivered(message) ? (
                      <Check className="h-4 w-4" />
                    ) : null}
                  </div>
                )}
              </div>
              <span className="text-xs text-muted-foreground mt-1">
                {format(new Date(message.createdAt), "p")}
              </span>
            </div>
          </div>
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
}