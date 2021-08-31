import React from 'react'
import { Container, HeaderCardQuiz, MenuItemStyled } from './style'
import { FiMoreHorizontal, FiTrash, FiEdit } from 'react-icons/fi'
import { UTILS } from '../../constants/utils'
import { IconButton, Grow, Paper, Popper, MenuList } from '@material-ui/core'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import { makeStyles } from '@material-ui/core/styles'
import api from '../../services/api'
import { useRouter } from 'next/router'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing(0),
  },
  button: {
    display: 'flex',
    background: 'red',
  },
  menuItem: {
    display: 'flex',
    alignItems: 'center',
  },
}))

const CardQuiz: React.FC<{
  header: string
  background?: string
  toggle?: boolean
  width?: string
  idQuiz?: string
  theme?: {
    primary?: string
    secondary?: string
    mainBg?: string
    contrastText?: string
    wrong?: string
    success?: string
  }
}> = ({ children, header, background, width, theme, toggle, idQuiz }) => {
  const classes = useStyles()
  const router = useRouter()
  const [open, setOpen] = React.useState(false)
  const anchorRef = React.useRef(null)

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen)
  }

  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return
    }

    setOpen(false)
  }

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault()
      setOpen(false)
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open)
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus()
    }

    prevOpen.current = open
  }, [open])

  const deleteQuiz = async (id: string) => {
    try {
      await api.delete(`quiz/${id}`)

      router.push('/')
    } catch (error) {
      alert(JSON.stringify({ err: error.message }))
    }
  }

  const updateQuiz = (id: string) => {
    try {
      router.push(`/update/${id}`)
    } catch (error) {
      alert(JSON.stringify({ err: error.message }))
    }
  }

  return (
    <Container background={background} width={width} themeCustom={theme}>
      <HeaderCardQuiz themeCustom={theme}>
        <p>{header}</p>
        {toggle && (
          <IconButton
            ref={anchorRef}
            style={{
              display: 'flex',
              padding: 2,
            }}
            // aria-controls={open ? 'menu-list-grow' : undefined}
            onClick={handleToggle}
          >
            <FiMoreHorizontal size={25} />
          </IconButton>
        )}
      </HeaderCardQuiz>
      <div>
        <div>
          <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === 'bottom' ? 'center top' : 'center bottom',
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList
                      autoFocusItem={open}
                      id="menu-list-grow"
                      onKeyDown={handleListKeyDown}
                      style={{
                        background: UTILS.theme.colors.primary,
                        color: UTILS.theme.colors.contrastText,
                      }}
                    >
                      <MenuItemStyled
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                        }}
                        onClick={() => deleteQuiz(idQuiz)}
                      >
                        <FiTrash size={20} />
                        Deletar
                      </MenuItemStyled>
                      <MenuItemStyled
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                        }}
                        onClick={() => updateQuiz(idQuiz)}
                      >
                        <FiEdit size={20} />
                        Atualizar
                      </MenuItemStyled>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
      </div>
      <div className="img-cover"></div>
      <div className="content">{children}</div>
    </Container>
  )
}

export default CardQuiz
