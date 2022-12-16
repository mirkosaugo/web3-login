import classNames from "classnames"

const Button = ({ text, onClick, theme = 'primary', size = 'primary', disabled = false }) => {

  const primaryStyle = `bg-gray-900 hover:bg-gray-700 disabled:hover:bg-gray-900`
  const secondaryStyle = `bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500`

  const primarySize = `px-24 py-6 text-2xl`
  const secondarySize = `px-16 py-4 text-md`

  const btnClass = `focus:outline-none text-white font-semibold h-auto rounded-lg w-full flex items-center justify-center sm:w-auto dark:bg-sky-500 dark:highlight-white/20 dark:hover:bg-sky-400 mt-5 duration-300 disabled:opacity-50`

  return (
    <button
      className={classNames(btnClass, {
        [primaryStyle]: theme === 'primary',
        [secondaryStyle]: theme === 'secondary',
        [primarySize]: size === 'primary',
        [secondarySize]: size === 'secondary',
      })}
      disabled={disabled}
      onClick={onClick}
    >
      { text }
    </button>
  )
}

export default Button