import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from './operations';

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,

  // extraReducers - Зовнішній Reducers
  // fetchContacts - назва санки, pending/fulfilled/rejected - статус кий повертає санка
  // колбек ф. (state, action) => { мутування стейту }
  extraReducers: builder =>
    builder

      .addCase(fetchContacts.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.items = [...payload].reverse();
      })

      .addCase(addContact.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.items = [payload, ...state.items];
      })

      .addCase(deleteContact.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.items = state.items.filter(item => item.id !== payload.id);
      })

      .addMatcher(
        isAnyOf(fetchContacts.pending, addContact.pending, deleteContact.pending),
        state => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchContacts.rejected,
          addContact.rejected,
          deleteContact.rejected
        ),
        (state, { payload }) => {
          state.isLoading = false;
          state.error = payload;
        }
      ),
});

export const contactsReducer = contactsSlice.reducer;
