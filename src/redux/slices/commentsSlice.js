import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    comments: [],
};

const comments = createSlice({
    name: "commentsSlice",
    initialState,
    reducers: {
        updateComments: (state, { payload }) => {
            state.comments = payload;
        },
        addNewComment: (state, { payload }) => {
            state.comments = state.comments.concat(payload)
        },
        updateComment: (state, { payload: { commentId, desc } }) => {
            state.comments = state.comments.map((c) => {
                if (c.id === commentId) {
                    c.desc = desc;
                }
                return c;
            });
        },
        incrementRepliesCount: (state, { payload: { commentId } }) => {
            state.comments = state.comments.map((c) => {
                if (c.id === commentId) {
                    c.replyCount += 1;
                }
                return c;
            });
        },
        addReplies: (state, { payload: { commentId, replies } }) => {
            state.comments = state.comments.map((c) => {
                if (c.id === commentId) {
                    c.replies = replies;
                }
                return c;
            });
        },
        removeReplies: (state, { payload: { commentId } }) => {
            state.comments = state.comments.map((c) => {
                if (c.id === commentId) c.replies = null;
                return c;
            });
        },
        updateReply: (state, { payload: { commentId, replyId, newDesc } }) => {
            state.comments = state.comments.map((c) => {
                if (c.id === commentId) {
                    c.replies.map((r) => {
                        if (r.id === replyId) {
                            r.desc = newDesc;
                        }
                        return r;
                    });
                }
                return c;
            });
        },
        deleteReply: (state, { payload: { commentId, replyId } }) => {
            state.comments = state.comments.map((c) => {
                if (c.id === commentId) {
                    c.replyCount -= 1;
                    let updatedReplies = c.replies.filter((r) => r.id !== replyId);
                    c.replies = updatedReplies.length ? updatedReplies : null;
                }
                return c;
            });
        },
    },
});

export const {
    incrementRepliesCount,
    updateComments,
    addNewComment,
    updateComment,
    addReplies,
    removeReplies,
    updateReply,
    deleteReply,
} = comments.actions;
export default comments.reducer;
