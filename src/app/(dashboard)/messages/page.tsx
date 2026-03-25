"use client";

import { useState, useEffect } from "react";
import { MessageSquare, Send, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { formatRelativeDate } from "@/lib/utils";

interface Conversation {
  id: string;
  subject: string | null;
  updatedAt: string;
  participants: {
    userId: string;
    unreadCount: number;
    user: { id: string; name: string | null; image: string | null };
  }[];
  messages: { body: string; createdAt: string }[];
}

const demoConversations: Conversation[] = [
  {
    id: "c1",
    subject: "Annual Engine Service - Sea Breeze",
    updatedAt: new Date(Date.now() - 2 * 3600000).toISOString(),
    participants: [
      { userId: "u1", unreadCount: 2, user: { id: "p1", name: "BlueWater Marine Services", image: null } },
    ],
    messages: [{ body: "Hi! We've completed the oil change and filter replacement. The impeller looked good. We'll be finishing up tomorrow morning.", createdAt: new Date(Date.now() - 2 * 3600000).toISOString() }],
  },
  {
    id: "c2",
    subject: "GPS Chartplotter Quote",
    updatedAt: new Date(Date.now() - 24 * 3600000).toISOString(),
    participants: [
      { userId: "u2", unreadCount: 0, user: { id: "p2", name: "Neptune Navigation Systems", image: null } },
    ],
    messages: [{ body: "I've sent over the quote for the Garmin GPSMAP 923xsv. Installation takes about 4 hours. When would you like to schedule?", createdAt: new Date(Date.now() - 24 * 3600000).toISOString() }],
  },
  {
    id: "c3",
    subject: "Hull Inspection Inquiry",
    updatedAt: new Date(Date.now() - 3 * 86400000).toISOString(),
    participants: [
      { userId: "u3", unreadCount: 1, user: { id: "p3", name: "Coastal Yacht Care", image: null } },
    ],
    messages: [{ body: "We can do the inspection next Thursday at 9am. We'll need to haul out at Dinner Key Marina. Do you have a preferred yard?", createdAt: new Date(Date.now() - 3 * 86400000).toISOString() }],
  },
];

export default function MessagesPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Conversation | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/messages")
      .then((r) => r.json())
      .then((data) => {
        setConversations(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const displayConversations =
    conversations.length > 0 ? conversations : demoConversations;

  const totalUnread = displayConversations.reduce(
    (sum, c) => sum + c.participants.reduce((s, p) => s + p.unreadCount, 0),
    0
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold text-navy">
            Messages
          </h1>
          <p className="text-slate-500 mt-1">
            {totalUnread > 0 ? `${totalUnread} unread message${totalUnread > 1 ? "s" : ""}` : "All messages read"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-280px)] min-h-[400px]">
        {/* Conversation list */}
        <div className="lg:col-span-1 bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col overflow-hidden">
          {/* Search */}
          <div className="p-4 border-b border-slate-100">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search conversations..."
                className="input-field pl-9 text-sm"
              />
            </div>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-50">
            {loading ? (
              <div className="space-y-1 p-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-16 bg-slate-100 rounded-xl animate-pulse" />
                ))}
              </div>
            ) : displayConversations.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full py-12 text-center px-6">
                <MessageSquare className="w-10 h-10 text-slate-200 mb-3" />
                <p className="text-sm text-slate-500">No conversations yet</p>
              </div>
            ) : (
              displayConversations.map((conv) => {
                const otherUser = conv.participants[0]?.user;
                const unread = conv.participants.reduce(
                  (sum, p) => sum + p.unreadCount,
                  0
                );
                const lastMsg = conv.messages[0];
                const isSelected = selected?.id === conv.id;

                return (
                  <button
                    key={conv.id}
                    onClick={() => setSelected(conv)}
                    className={`w-full text-left flex items-start gap-3 p-4 hover:bg-slate-50 transition-colors ${isSelected ? "bg-ocean/5 border-l-4 border-ocean" : ""}`}
                  >
                    <Avatar src={null} name={otherUser?.name} size="md" className="flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-0.5">
                        <p className={`text-sm truncate ${unread > 0 ? "font-bold text-navy" : "font-medium text-slate-700"}`}>
                          {otherUser?.name ?? "Unknown"}
                        </p>
                        <div className="flex items-center gap-1.5 flex-shrink-0">
                          <span className="text-xs text-slate-400">
                            {formatRelativeDate(conv.updatedAt)}
                          </span>
                          {unread > 0 && (
                            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-ocean text-white text-xs font-bold">
                              {unread}
                            </span>
                          )}
                        </div>
                      </div>
                      {conv.subject && (
                        <p className="text-xs text-slate-600 font-medium truncate mb-0.5">
                          {conv.subject}
                        </p>
                      )}
                      {lastMsg && (
                        <p className="text-xs text-slate-400 truncate">
                          {lastMsg.body}
                        </p>
                      )}
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Message thread */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col overflow-hidden">
          {selected ? (
            <>
              {/* Thread header */}
              <div className="flex items-center gap-3 p-4 border-b border-slate-100">
                <Avatar
                  src={null}
                  name={selected.participants[0]?.user.name}
                  size="md"
                />
                <div>
                  <p className="font-semibold text-navy">
                    {selected.participants[0]?.user.name}
                  </p>
                  {selected.subject && (
                    <p className="text-sm text-slate-500">{selected.subject}</p>
                  )}
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {/* Demo messages */}
                <div className="flex items-end gap-3">
                  <Avatar src={null} name={selected.participants[0]?.user.name} size="sm" />
                  <div className="flex-1 max-w-sm">
                    <div className="bg-slate-100 rounded-2xl rounded-bl-none p-3">
                      <p className="text-sm text-slate-800">
                        {selected.messages[0]?.body ??
                          "No messages yet in this conversation."}
                      </p>
                    </div>
                    <p className="text-xs text-slate-400 mt-1 ml-1">
                      {selected.messages[0]
                        ? formatRelativeDate(selected.messages[0].createdAt)
                        : ""}
                    </p>
                  </div>
                </div>

                <div className="flex items-end gap-3 flex-row-reverse">
                  <Avatar src={null} name="You" size="sm" />
                  <div className="flex-1 max-w-sm flex flex-col items-end">
                    <div className="bg-gradient-ocean rounded-2xl rounded-br-none p-3">
                      <p className="text-sm text-white">
                        Thanks for the update! Looking forward to getting it done.
                      </p>
                    </div>
                    <p className="text-xs text-slate-400 mt-1 mr-1">
                      1 hour ago
                    </p>
                  </div>
                </div>
              </div>

              {/* Message input */}
              <div className="p-4 border-t border-slate-100">
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="input-field flex-1"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && message.trim()) {
                        setMessage("");
                      }
                    }}
                  />
                  <Button
                    variant="ocean"
                    size="icon"
                    disabled={!message.trim()}
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center p-8">
              <div className="text-5xl mb-4">💬</div>
              <h3 className="font-heading font-semibold text-navy mb-2">
                Select a conversation
              </h3>
              <p className="text-slate-500 text-sm">
                Choose a conversation from the left to start messaging
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
