
export const getLocal = async () => {
    let user_id = localStorage.getItem("user_id");
    return user_id;
}

export function setLocal(user_id) {
    localStorage.setItem("user_id", user_id);
}