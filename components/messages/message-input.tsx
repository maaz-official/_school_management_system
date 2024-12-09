"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { messageApi } from "@/lib/api/messages";
import { Paperclip, Send, X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface MessageInputProps {
  recipientId?: string;
  groupId?: string;
  replyTo?: string;
  onMessageSent: () => void;
}

export function MessageInput({
  recipientId,
  groupId,
  replyTo,
  onMessageSent,
}: MessageInputProps) {
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [content]);

  const handleSubmit = async () => {
    if (!content.trim() && selectedFiles.length === 0) return;

    try {
      setIsLoading(true);
      const formData = new FormData();
      
      if (recipientId) formData.append("recipientId", recipientId);
      if (groupId) formData.append("groupId", groupId);
      if (replyTo) formData.append("replyTo", replyTo);
      
      formData.append("content", content);
      formData.append("type", selectedFiles.length > 0 ? "file" : "text");

      selectedFiles.forEach((file) => {
        formData.append("files", file);
      });

      await messageApi.sendMessage(formData);
      setContent("");
      setSelectedFiles([]);
      onMessageSent();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFiles(prev => [...prev, ...Array.from(event.target.files!)]);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="border-t p-4">
      {selectedFiles.length > 0 && (
        <ScrollArea className="mb-4 max-h-32">
          <div className="flex flex-wrap gap-2">
            {selectedFiles.map((file, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-muted rounded-md px-3 py-1"
              >
                <Paperclip className="h-4 w-4" />
                <span className="text-sm truncate max-w-[150px]">
                  {file.name}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 p-0"
                  onClick={() => removeFile(index)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        </ScrollArea>
      )}
      <div className="flex items-end gap-4">
        <div className="flex-1">
          <Textarea
            ref={textareaRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="min-h-[60px] max-h-[200px] resize-none"
            rows={1}
          />
        </div>
        <div className="flex flex-col gap-2">
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            multiple
            onChange={handleFileSelect}
          />
          <Button
            variant="outline"
            size="icon"
            onClick={() => fileInputRef.current?.click()}
          >
            <Paperclip className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            onClick={handleSubmit}
            disabled={isLoading || (!content.trim() && selectedFiles.length === 0)}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}