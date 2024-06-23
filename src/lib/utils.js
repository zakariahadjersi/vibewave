export const convertFileToUrl = (file) => URL.createObjectURL(file);

export const getCookie = (cookieName) => {
    const cookieArray = document.cookie.split(";");

    for (const cookie of cookieArray) {
        let cookieString = cookie;

        while (cookieString.charAt(0) == " ") {
            cookieString = cookieString.substring(1, cookieString.length);
        }
        if (cookieString.indexOf(cookieName + "=") == 0) {
            return cookieString.substring(cookieName.length + 1, cookieString.length);
        }
    }

    return undefined;
};

export function formatDateString(dateString) {
    const options = {
        year: "numeric",
        month: "short",
        day: "numeric",
    };

    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-US", options);

    const time = date.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
    });

    return `${formattedDate} at ${time}`;
}

export const multiFormatDateString = (timestamp = "") => {
    const timestampNum = Math.round(new Date(timestamp).getTime() / 1000);
    const date = new Date(timestampNum * 1000);
    const now = new Date();

    const diff = now.getTime() - date.getTime();
    const diffInSeconds = diff / 1000;
    const diffInMinutes = diffInSeconds / 60;
    const diffInHours = diffInMinutes / 60;
    const diffInDays = diffInHours / 24;

    switch (true) {
        case Math.floor(diffInDays) >= 30:
            return formatDateString(timestamp);
        case Math.floor(diffInDays) === 1:
            return `${Math.floor(diffInDays)} day ago`;
        case Math.floor(diffInDays) > 1 && diffInDays < 30:
            return `${Math.floor(diffInDays)} days ago`;
        case Math.floor(diffInHours) >= 1:
            return `${Math.floor(diffInHours)} hours ago`;
        case Math.floor(diffInMinutes) >= 1:
            return `${Math.floor(diffInMinutes)} minutes ago`;
        default:
            return "Just now";
    }
};

export const checkIsLiked = (likeList, userId) => {
    return likeList.includes(userId);
};