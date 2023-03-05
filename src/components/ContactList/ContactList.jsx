import { useDispatch, useSelector } from 'react-redux';
import { getFilteredContacts, getIsLoading } from 'redux/selectors';
import { deleteContact, fetchContacts } from 'redux/operations';
import { useEffect } from 'react';
import { Loader } from 'components/Loader/Loader';
import css from './ContactList.module.css';

export const ContactList = () => {
  const isLoading = useSelector(getIsLoading);
  const contacts = useSelector(getFilteredContacts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleDelete = id => {
    dispatch(deleteContact(id));
  };

  return (
    <div>
      {isLoading && <Loader />}
      <ul>
        {contacts.map(contact => (
          <li key={contact.id} className={css.contactItem}>
            <div>
              <span>{contact.name} : </span>
              <span>{contact.number}</span>
            </div>
            <button
              type="button"
              className={css.btnItem}
              onClick={() => handleDelete(contact.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
