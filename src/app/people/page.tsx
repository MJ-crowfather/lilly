'use client';

import { AppHeader } from '@/components/layout/app-header';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { teamMembers, type TeamMember } from '@/lib/data';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Search } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

function MemberAvatar({ name }: { name: string }) {
    const initial = name.charAt(0).toUpperCase();
    return (
        <Avatar className="h-6 w-6">
            <AvatarFallback className="bg-muted-foreground text-background text-xs font-bold">{initial}</AvatarFallback>
        </Avatar>
    );
}

export default function PeoplePage() {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <div className="flex flex-col h-screen">
                    <AppHeader />
                    <main className="p-6 flex-1">
                        <div className="mb-6">
                            <h1 className="text-2xl font-bold mb-4">People</h1>
                            <div className="flex justify-between items-center">
                                <div className="relative w-full max-w-sm">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input placeholder="Search team members" className="pl-10" />
                                </div>
                                <Button className="bg-gray-800 text-white hover:bg-gray-900">Invite members</Button>
                            </div>
                        </div>

                        <Tabs defaultValue="team-members">
                            <TabsList className="border-b-0 p-0 bg-transparent gap-4">
                                <TabsTrigger value="team-members" className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none p-2 text-sm font-medium">Team members</TabsTrigger>
                                <TabsTrigger value="invited" className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none p-2 text-sm font-medium text-muted-foreground">Invited</TabsTrigger>
                            </TabsList>
                            <TabsContent value="team-members" className="mt-4">
                                <div className="rounded-lg border bg-card text-card-foreground">
                                    <Table>
                                        <TableHeader>
                                            <TableRow className="hover:bg-transparent">
                                                <TableHead>Name</TableHead>
                                                <TableHead>Email</TableHead>
                                                <TableHead>Role</TableHead>
                                                <TableHead>Team</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {teamMembers.map((member) => (
                                                <TableRow key={member.email}>
                                                    <TableCell>
                                                        <div className="flex items-center gap-3">
                                                            <MemberAvatar name={member.name} />
                                                            <span className="font-medium">{member.name}</span>
                                                            {member.isYou && <span className="text-muted-foreground text-sm">(You)</span>}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="text-muted-foreground">{member.email}</TableCell>
                                                    <TableCell className="text-muted-foreground">{member.role}</TableCell>
                                                    <TableCell className="text-muted-foreground">{member.team}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            </TabsContent>
                             <TabsContent value="invited">
                                <div className="text-center p-8 border rounded-lg">
                                    <h3 className="font-semibold">No pending invitations</h3>
                                    <p className="text-sm text-muted-foreground">Invited members will appear here.</p>
                                </div>
                            </TabsContent>
                        </Tabs>

                    </main>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
