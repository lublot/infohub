import React from 'react'

/**
 * Este componente renderiza uma mensagem de erro genérica para a aplicação
 */
function ErrorMessage() {
  return (
    <div>
      <img
        src="/error.svg"
        alt="Falha ao obter dados"
        width="80%"
        height="auto"
        style={{ "padding": '2rem 0' }} />
      <br/>
      <strong>Falha ao obter informações.</strong>
    </div>
  )
}

export default ErrorMessage
