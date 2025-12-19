import { useCallback, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSidebar } from '../../context/SidebarContext';
import {
    MdDashboard,
    MdInventory,
    MdShoppingCart,
    MdPeople,
    MdBarChart,
    MdExpandMore,
    MdChevronRight,
    MdMoreHoriz,
    MdCalendarToday,
    MdPerson,
    MdChecklist,
    MdDescription,
    MdTableChart,
    MdFolder,
    MdChat,
    MdStore,
    MdLocalShipping,
    MdSmartToy,
    MdTrendingUp,
    MdCampaign,
    MdContacts,
    MdTextFields,
    MdImage,
    MdCode,
    MdVideoLibrary,
    MdAdd,
    MdReceipt,
    MdDescription as MdInvoice,
    MdPayment
} from 'react-icons/md';

const AppSidebar = () => {
    const { isExpanded, isMobileOpen, isHovered, setIsHovered, closeMobileSidebar } = useSidebar();
    const location = useLocation();
    const [openDropdowns, setOpenDropdowns] = useState({});

    const isActive = useCallback(
        (path) => location.pathname === path,
        [location.pathname]
    );

    const toggleDropdown = (key) => {
        setOpenDropdowns(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    // Auto-expand dropdowns if any child is active
    useEffect(() => {
        setOpenDropdowns(prev => {
            const newOpenDropdowns = { ...prev };
            let hasChanges = false;

            // Check AI Assistant
            const aiAssistantItems = [
                '/admin/ai-assistant/text-generator',
                '/admin/ai-assistant/image-generator',
                '/admin/ai-assistant/code-generator',
                '/admin/ai-assistant/video-generator'
            ];
            if (aiAssistantItems.some(path => location.pathname === path)) {
                if (!newOpenDropdowns['AI Assistant']) {
                    newOpenDropdowns['AI Assistant'] = true;
                    hasChanges = true;
                }
            }

            // Check E-commerce
            const ecommerceItems = [
                '/admin/products',
                '/admin/products/add',
                '/admin/billing',
                '/admin/invoices',
                '/admin/invoices/single',
                '/admin/invoices/create',
                '/admin/transactions',
                '/admin/transactions/single'
            ];
            if (ecommerceItems.some(path => location.pathname === path)) {
                if (!newOpenDropdowns['E-commerce']) {
                    newOpenDropdowns['E-commerce'] = true;
                    hasChanges = true;
                }
            }

            return hasChanges ? newOpenDropdowns : prev;
        });
    }, [location.pathname]);

    const menuItems = [
        {
            icon: <MdDashboard />,
            name: 'Dashboard',
            path: '/admin/dashboard'
        }
    ];

    const ecommerceItems = [
        { icon: <MdBarChart />, name: 'Analytics', path: '/admin/analytics' },
        { icon: <MdCampaign />, name: 'Marketing', path: '/admin/marketing' },
        { icon: <MdContacts />, name: 'CRM', path: '/admin/crm' },
        { icon: <MdInventory />, name: 'Stocks', path: '/admin/stocks' }
    ];

    const newItems = [
        {
            icon: <MdStore />,
            name: 'SaaS',
            path: '/admin/saas',
            badge: 'NEW'
        },
        {
            icon: <MdLocalShipping />,
            name: 'Logistics',
            path: '/admin/logistics',
            badge: 'NEW'
        },
        {
            icon: <MdSmartToy />,
            name: 'AI Assistant',
            path: '/admin/ai-assistant',
            badge: 'NEW',
            hasDropdown: true,
            dropdownItems: [
                { name: 'Text Generator', path: '/admin/ai-assistant/text-generator' },
                { name: 'Image Generator', path: '/admin/ai-assistant/image-generator' },
                { name: 'Code Generator', path: '/admin/ai-assistant/code-generator' },
                { name: 'Video Generator', path: '/admin/ai-assistant/video-generator' }
            ]
        },
        {
            icon: <MdShoppingCart />,
            name: 'E-commerce',
            path: '/admin/ecommerce',
            badge: 'NEW',
            hasDropdown: true,
            dropdownItems: [
                { name: 'Products', path: '/admin/products' },
                { name: 'Add Product', path: '/admin/products/add' },
                { name: 'Billing', path: '/admin/billing' },
                { name: 'Invoices', path: '/admin/invoices' },
                { name: 'Single Invoice', path: '/admin/invoices/single' },
                { name: 'Create Invoice', path: '/admin/invoices/create' },
                { name: 'Transactions', path: '/admin/transactions' },
                { name: 'Single Transaction', path: '/admin/transactions/single' }
            ]
        }
    ];

    const otherItems = [
        { icon: <MdCalendarToday />, name: 'Calendar', path: '/admin/calendar' },
        { icon: <MdPerson />, name: 'User Profile', path: '/admin/profile' },
        {
            icon: <MdChecklist />,
            name: 'Task',
            path: '/admin/tasks',
            hasDropdown: true,
            dropdownItems: [
                { name: 'All Tasks', path: '/admin/tasks' },
                { name: 'My Tasks', path: '/admin/tasks/my' }
            ]
        },
        {
            icon: <MdDescription />,
            name: 'Forms',
            path: '/admin/forms',
            hasDropdown: true,
            dropdownItems: [
                { name: 'Form Elements', path: '/admin/forms/elements' },
                { name: 'Form Layout', path: '/admin/forms/layout' }
            ]
        },
        {
            icon: <MdTableChart />,
            name: 'Tables',
            path: '/admin/tables',
            hasDropdown: true,
            dropdownItems: [
                { name: 'Basic Table', path: '/admin/tables/basic' },
                { name: 'Data Table', path: '/admin/tables/data' }
            ]
        },
        {
            icon: <MdFolder />,
            name: 'Pages',
            path: '/admin/pages',
            hasDropdown: true,
            dropdownItems: [
                { name: 'Settings', path: '/admin/pages/settings' },
                { name: 'Blank Page', path: '/admin/pages/blank' }
            ]
        }
    ];

    const supportItems = [
        { icon: <MdChat />, name: 'Chat', path: '/admin/chat' }
    ];

    const renderMenuItem = (item, index) => {
        const isItemActive = isActive(item.path);
        // Check if any dropdown item is active
        const hasActiveChild = item.hasDropdown && item.dropdownItems?.some(subItem => isActive(subItem.path));
        const isParentActive = isItemActive || hasActiveChild;
        const isDropdownOpen = openDropdowns[item.name] || false;

        if (item.hasDropdown) {
            return (
                <li key={item.name || index}>
                    <button
                        type="button"
                        onClick={(e) => {
                            e.preventDefault();
                            toggleDropdown(item.name);
                        }}
                        className={`menu-item group w-full ${isParentActive ? 'menu-item-active' : 'menu-item-inactive'}`}
                    >
                        <span className={`menu-item-icon-size ${isParentActive ? 'menu-item-icon-active' : 'menu-item-icon-inactive'}`}>
                            {item.icon}
                        </span>
                        {(isExpanded || isHovered || isMobileOpen) && (
                            <>
                                <span className="menu-item-text flex-1 text-left">{item.name}</span>
                                {item.badge && (
                                    <span className="px-2 py-0.5 text-xs font-medium uppercase bg-success-500 text-white rounded-full">
                                        {item.badge}
                                    </span>
                                )}
                                <span className={`menu-item-arrow transition-transform ${isDropdownOpen ? 'menu-item-arrow-active' : 'menu-item-arrow-inactive'}`}>
                                    {isDropdownOpen ? <MdExpandMore /> : <MdChevronRight />}
                                </span>
                            </>
                        )}
                    </button>
                    {isDropdownOpen && item.dropdownItems && Array.isArray(item.dropdownItems) && item.dropdownItems.length > 0 && (isExpanded || isHovered || isMobileOpen) && (
                        <ul className="ml-3 mt-2 space-y-1 border-l-2 border-gray-200 dark:border-gray-700 pl-3">
                            {item.dropdownItems.map((subItem, subIndex) => {
                                const isSubItemActive = isActive(subItem.path);
                                return (
                                    <li key={`${item.name}-${subIndex}`} className="block">
                                        <Link
                                            to={subItem.path}
                                            onClick={closeMobileSidebar}
                                            className={`relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium block w-full ${
                                                isSubItemActive 
                                                    ? 'bg-brand-50 text-brand-500 dark:bg-brand-500/20 dark:text-brand-400' 
                                                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/5'
                                            }`}
                                        >
                                            {subItem.name}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </li>
            );
        }

        return (
            <li key={item.name || index}>
                <Link
                    to={item.path}
                    onClick={closeMobileSidebar}
                    className={`menu-item group ${isItemActive ? 'menu-item-active' : 'menu-item-inactive'}`}
                >
                    <span className={`menu-item-icon-size ${isItemActive ? 'menu-item-icon-active' : 'menu-item-icon-inactive'}`}>
                        {item.icon}
                    </span>
                    {(isExpanded || isHovered || isMobileOpen) && (
                        <>
                            <span className="menu-item-text">{item.name}</span>
                            {item.badge && (
                                <span className="px-2 py-0.5 text-xs font-medium uppercase bg-brand-100 dark:bg-brand-500/20 text-brand-500 dark:text-brand-400 rounded-full">
                                    {item.badge}
                                </span>
                            )}
                        </>
                    )}
                </Link>
            </li>
        );
    };

    return (
        <>
            {/* Mobile Overlay */}
            {isMobileOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={closeMobileSidebar}
                />
            )}
            <aside
                className={`fixed flex flex-col top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
                    ${isExpanded || isMobileOpen ? 'w-[290px]' : isHovered ? 'w-[290px]' : 'w-[90px]'}
                    ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
                    lg:translate-x-0 lg:static lg:h-full`}
                onMouseEnter={() => !isExpanded && setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
            {/* Navigation */}
            <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar py-6">
                <nav className="space-y-6">
                    {/* MENU Section */}
                    <div>
                        <h2 className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 font-semibold ${!isExpanded && !isHovered ? 'lg:justify-center' : 'justify-start'}`}>
                            {isExpanded || isHovered || isMobileOpen ? 'MENU' : <MdMoreHoriz className="size-6" />}
                        </h2>
                        <ul className="flex flex-col gap-1">
                            {menuItems.map(renderMenuItem)}
                        </ul>
                    </div>

                    {/* Ecommerce Section */}
                    {(isExpanded || isHovered || isMobileOpen) && (
                        <div>
                            <h2 className="mb-4 text-xs uppercase leading-[20px] text-gray-400 font-semibold">Ecommerce</h2>
                            <ul className="flex flex-col gap-1">
                                {ecommerceItems.map(renderMenuItem)}
                            </ul>
                        </div>
                    )}

                    {/* NEW Items Section */}
                    <div>
                        {(isExpanded || isHovered || isMobileOpen) && (
                            <h2 className="mb-4 text-xs uppercase leading-[20px] text-gray-400 font-semibold">New</h2>
                        )}
                        <ul className="flex flex-col gap-1">
                            {newItems.map((item, idx) => renderMenuItem(item, idx))}
                        </ul>
                    </div>

                    {/* Other Items */}
                    <div>
                        <ul className="flex flex-col gap-1">
                            {otherItems.map(renderMenuItem)}
                        </ul>
                    </div>

                    {/* SUPPORT Section */}
                    {(isExpanded || isHovered || isMobileOpen) && (
                        <div>
                            <h2 className="mb-4 text-xs uppercase leading-[20px] text-gray-400 font-semibold">SUPPORT</h2>
                            <ul className="flex flex-col gap-1">
                                {supportItems.map(renderMenuItem)}
                            </ul>
                        </div>
                    )}
                </nav>
            </div>
        </aside>
        </>
    );
};

export default AppSidebar;
