import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, FileText, HelpCircle, Home, Leaf, Settings, Sliders } from 'lucide-react';
import { useState } from 'react';
import { NavUser } from '../nav-user';

interface SidebarProps {
    className?: string;
    collapsed?: boolean;
    onToggleCollapse?: () => void;
}

const Sidebar = ({ className, collapsed = false, onToggleCollapse }: SidebarProps) => {
    const [isCollapsed, setIsCollapsed] = useState(collapsed);

    const handleToggleCollapse = () => {
        const newCollapsedState = !isCollapsed;
        setIsCollapsed(newCollapsedState);
        if (onToggleCollapse) {
            onToggleCollapse();
        }
    };

    const navItems = [
        { name: 'Dashboard', icon: <Home size={20} />, active: true },
        { name: 'System Controls', icon: <Sliders size={20} />, active: false },
        { name: 'Settings', icon: <Settings size={20} />, active: false },
        { name: 'Reports', icon: <FileText size={20} />, active: false },
        { name: 'Help', icon: <HelpCircle size={20} />, active: false },
    ];

    return (
        <div className={cn('flex h-full flex-col border-r bg-background transition-all duration-300', isCollapsed ? 'w-16' : 'w-64', className)}>
            {/* Logo and collapse button */}
            <div className="flex items-center justify-between p-4">
                <div className="flex items-center space-x-2">
                    <Leaf className="text-primary" size={24} />
                    {!isCollapsed && <span className="text-lg font-semibold">HydroMonitor</span>}
                </div>
                <Button variant="ghost" size="icon" onClick={handleToggleCollapse} className="h-8 w-8">
                    {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
                </Button>
            </div>

            <Separator />

            {/* Navigation */}
            <ScrollArea className="flex-1">
                <nav className="px-2 py-4">
                    <TooltipProvider delayDuration={0}>
                        <ul className="space-y-2">
                            {navItems.map((item) => (
                                <li key={item.name}>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button
                                                variant={item.active ? 'secondary' : 'ghost'}
                                                className={cn('w-full justify-start', isCollapsed ? 'px-2' : 'px-3')}
                                            >
                                                <span className="flex items-center">
                                                    <span className={cn(item.active ? 'text-primary' : 'text-muted-foreground')}>{item.icon}</span>
                                                    {!isCollapsed && <span className="ml-3">{item.name}</span>}
                                                </span>
                                            </Button>
                                        </TooltipTrigger>
                                        {isCollapsed && <TooltipContent side="right">{item.name}</TooltipContent>}
                                    </Tooltip>
                                </li>
                            ))}
                        </ul>
                    </TooltipProvider>
                </nav>
            </ScrollArea>

            {/* Footer */}
            <div className="static bottom-0 p-4">
                <NavUser />
            </div>
        </div>
    );
};

export default Sidebar;
