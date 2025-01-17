import * as React from "react";
import Svg, { G, Path } from "react-native-svg";
export const Play = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={16}
        height={16}
        fill="none"
        {...props}
    >
        <Path
            fill="#000"
            d="M5.333 12.261V3.739L12.151 8l-6.818 4.261ZM4 2.536v10.928c0 .524.576.843 1.02.565l8.742-5.464a.667.667 0 0 0 0-1.13L5.02 1.97A.667.667 0 0 0 4 2.536Z"
        />
    </Svg>
);

export const Flag = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={16}
        height={16}
        fill="none"
        {...props}
    >
        <Path
            fill="#000"
            d="M8.255 2c.252 0 .483.143.596.369l.482.964h4c.369 0 .667.299.667.667v7.333a.667.667 0 0 1-.666.667H9.079a.667.667 0 0 1-.596-.368L8 10.667H3.333v4H2V2h6.255Zm-.412 1.333h-4.51v6h5.491l.667 1.334h3.176v-6H8.509l-.666-1.334Z"
        />
    </Svg>
);

export const ArrowRight = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={16}
        height={16}
        fill="none"
        {...props}
    >
        <Path
            fill="#000"
            d="M10.781 7.333 7.205 3.757l.943-.943L13.333 8l-5.185 5.185-.943-.943 3.576-3.575H2.667V7.333h8.114Z"
        />
    </Svg>
);

export const Location = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={16}
        height={16}
        fill="none"
        {...props}
    >
        <Path
            fill="#000"
            d="m8 13.933 3.3-3.3a4.667 4.667 0 1 0-6.6 0l3.3 3.3Zm0 1.886-4.243-4.243a6 6 0 1 1 8.486 0L8 15.818Zm0-7.152A1.333 1.333 0 1 0 8 6a1.333 1.333 0 0 0 0 2.667ZM8 10a2.667 2.667 0 1 1 0-5.333A2.667 2.667 0 0 1 8 10Z"
        />
    </Svg>
);

export const LinkArrow = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={16}
        height={16}
        fill="none"
        {...props}
    >
        <Path
            fill="#fff"
            d="M10.67 6.276 4.93 12.014l-.942-.943 5.737-5.738H4.67V4h7.333v7.333H10.67V6.276Z"
        />
    </Svg>
);

export const HomeIcon = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        fill="none"
        {...props}
    >
        <Path
            stroke="#6C4BA4"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"
        />
        <Path
            stroke="#6C4BA4"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-9Z"
        />
    </Svg>
);
export const HomeInactive = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        fill="none"
        {...props}
    >
        <Path
            stroke="#D0D0D0"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"
        />
        <Path
            stroke="#D0D0D0"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-9Z"
        />
    </Svg>
);

export const PlayerIcon = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        fill="none"
        {...props}
    >
        <Path
            stroke="#6C4BA4"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 16v5M16 14v7M20 10v11M22 3l-8.646 8.646a.498.498 0 0 1-.708 0L9.354 8.354a.5.5 0 0 0-.707 0L2 15M4 18v3M8 14v7"
        />
    </Svg>
);

export const PlayerIconInactive = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        fill="none"
        {...props}
    >
        <Path
            stroke="#D0D0D0"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 16v5M16 14v7M20 10v11M22 3l-8.646 8.646a.498.498 0 0 1-.708 0L9.354 8.354a.5.5 0 0 0-.707 0L2 15M4 18v3M8 14v7"
        />
    </Svg>
);

export const ProfileIcon = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        fill="none"
        {...props}
    >
        <Path
            stroke="#6C4BA4"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 13a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z"
        />
        <Path
            stroke="#6C4BA4"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20 21a8 8 0 0 0-16 0"
        />
    </Svg>
);

export const ProfileIconInactive = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        fill="none"
        {...props}
    >
        <Path
            stroke="#D0D0D0"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 13a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z"
        />
        <Path
            stroke="#D0D0D0"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20 21a8 8 0 0 0-16 0"
        />
    </Svg>
);

export const ArrowUp = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={14}
        height={14}
        fill="none"
        {...props}
    >
        <Path
            stroke="#009A4D"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.167}
            d="M4.667 3.5 7 1.167 9.333 3.5M7 1.167v11.666"
        />
    </Svg>
);

export const EmailIcon = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        fill="none"
        {...props}
    >
        <Path
            stroke="#6C4BA4"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Z"
        />
        <Path
            stroke="#6C4BA4"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"
        />
    </Svg>
);

export const PasswordIcon = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        fill="none"
        {...props}
    >
        <Path
            stroke="#6C4BA4"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 17a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
        />
        <Path
            stroke="#6C4BA4"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 10H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2ZM7 10V7a5 5 0 1 1 10 0v3"
        />
    </Svg>
);

export const EyeOpen = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        fill="none"
        {...props}
    >
        <Path
            stroke="#6C4BA4"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0Z"
        />
        <Path
            stroke="#6C4BA4"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
        />
    </Svg>
);

export const EyeClosed = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        fill="none"
        {...props}
    >
        <Path
            stroke="#6C4BA4"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49M14.084 14.158a3 3 0 0 1-4.242-4.242"
        />
        <Path
            stroke="#6C4BA4"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143M2 2l20 20"
        />
    </Svg>
);

export const PlusIcon = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={25}
        height={25}
        fill="none"
        {...props}
    >
        <Path
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5.5 12.5h14M12.5 5.5v14"
        />
    </Svg>
);

export const EditIcon = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke="#6d4ca4"
        viewBox="0 0 24 24"
        {...props}
    >
        <G strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}>
            <Path d="m21.28 6.4-9.54 9.54c-.95.95-3.77 1.39-4.4.76-.63-.63-.2-3.45.75-4.4l9.55-9.55a2.58 2.58 0 1 1 3.64 3.65v0Z" />
            <Path d="M11 4H6a4 4 0 0 0-4 4v10a4 4 0 0 0 4 4h11c2.21 0 3-1.8 3-4v-5" />
        </G>
    </Svg>
);

export const SignoutIcon = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        fill="none"
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        className="lucide lucide-log-out"
        {...props}
    >
        <Path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
    </Svg>
);
