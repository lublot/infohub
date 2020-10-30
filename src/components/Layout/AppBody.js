import React, { useContext } from 'react';
import { UserContext } from '../../contexts/UserInfoContext';
import UserSection from './UserSection';
import RepositorySection from './RepositorySection';
import ErrorMessage from './ErrorMessage';

/**
 * Este componente controla quais seções devem ser exibidas a depender do estado da aplicação
 */
function AppBody () {
  const { repositoryInfo, userData, repositoryError, userError } = useContext(UserContext)
  return (
    <>
      { userData ? (<UserSection />) : null}
      { userError || repositoryError ? <ErrorMessage/> : null}
      { repositoryInfo ? (<RepositorySection/>) : null }
    </>
  )
}

export default AppBody
