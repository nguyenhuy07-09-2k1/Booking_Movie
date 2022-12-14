import { Alert, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar, useMediaQuery, useTheme } from "@mui/material";
import { Editor } from "@tinymce/tinymce-react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Button, DropdownProps, Form, Icon, Input } from "semantic-ui-react";
import { useAppDispatch, useAppSelector } from "../../../../../app/hooks";
import { GetAllActor } from "../../../../../services/actor.service";
import { Actor, GetAllActorAsync } from "../../../../../slices/actor/actorSlice";
import { GetCategoriesAsync } from "../../../../../slices/categories/categorySlice";
import { GetDirectorAsync } from "../../../../../slices/directors/directorSlice";
import { CreateNewMovieAsync, emptyMovieStatus } from "../../../../../slices/movie/movieSlice";
import { GetNationalitiesAsync } from "../../../../../slices/nationalities/nationalitySlice";
import { GetProducerAsync } from "../../../../../slices/producers/producerSlice";
import DropdownComponent, { dataDropdownOption } from "../../../../ui-component/common/Dropdown/DropdownComponent";
import { toLowerCaseNonAccentVietnamese } from "../../../../utils/NonAccentVietnamese";



const AcceptedImgFileType: string = ".jpg, .png, image/*"

const AcceptedVideoFileType: string = "video/*"




const AddNewMovie: React.FC = () => {

    const theme = useTheme();
    const dispatch = useAppDispatch();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const token = localStorage.getItem("token");
    const status_create = useAppSelector(state => state.actor.status);
    const error = useAppSelector(state => state.actor.error);
    const [open, setOpen] = React.useState(false);
    const [messageCreate, setMessageCreate] = useState<string>("");
    // input variable

    const [alias, setAlias] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [duration, setDuration] = useState<number>(0);
    const [releaseDate, setReleaseDate] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [status, setStatus] = useState<boolean>(false);
    const [image, setImage] = useState<File | null>(null);

   
    const [nationality, setNationality] = useState<string | null>(null);


    // tiny editor

    const editorRef = React.useRef<any>(null);
    // dropdown category 
    const [openAdd, setOpenAdd] = useState(false);

  

    // 
    const nationalities = useAppSelector(state => state.nationality.nationalities);
    const status_nationalities = useAppSelector(state => state.nationality.status);
    const [dataNationalitiesOption, setDataNationalitiesOption] = useState<dataDropdownOption[]>();



    // 

    // const GetActorsAsync = useCallback(async () => {

    //     const result = await GetAllActor();
       
    // }, []);

    useEffect(() => {

       
        if (status_create === "added") {
            setMessageCreate("Th??m th??nh c??ng")
            setOpen(true);
            dispatch(emptyMovieStatus())
        }

        else if (status_create === "failed") {
            setMessageCreate(error);
            setOpen(true);

        }

    }, [dispatch, status_create]);

    const handleClickAddOpen = useMemo(() => () => {
        setOpenAdd(true);

        

        const dataNationalitiesOption: dataDropdownOption[] = [...nationalities].map(nationality => (
            {
                key: nationality.id,
                text: nationality.name,
                value: nationality.id
            }
        ));
        setDataNationalitiesOption(dataNationalitiesOption);

        
    }, [nationalities]);

    const handleAddClose = () => {
        setOpenAdd(false);
    };
    const handleCancelAdd = () => {
        setOpenAdd(false);
    };
    const handleConfirmAdd = () => {
        // setOpenAdd(false);
        // dispatch(CreateNewMovieAsync({name: name, alias: alias, duration,  releaseDate: new Date(releaseDate).toISOString(), content, status, imageBackground: imgBackground!, imagePreview: imgPreview!,  videoTrailer: videoTrailer!, producer: producer!, nationality: nationality!, categoryId: category!, directorId: director!, actorId: actor!, token: token!  }))
        console.log(name, duration, releaseDate, content, status, nationality);
    };

   
    const HandleNationalityChange = (e: React.SyntheticEvent<HTMLElement, Event>, data: DropdownProps) => {
        setNationality(data.value as string);

    }


    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };



    return (
        <>
            <Button icon color='blue' onClick={handleClickAddOpen} labelPosition='right'>
                <Icon name='add' /> Th??m m???i
            </Button>
            <Dialog
                fullScreen={fullScreen}
                open={openAdd}
                onClose={handleAddClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" className='text-3xl font-semibold'>
                    {"Th??m m???i phim"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Khi th??m m???i b??? phim s??? th??m m???i
                    </DialogContentText>

                    {/* Input field here */}
                    <Container className='pt-5'>
                        <Form size='small'>
                            <Form.Field>
                                <Input
                                    icon='id badge'
                                    iconPosition='left'
                                    label={{ tag: true, content: 'T??n' }}
                                    labelPosition='right'
                                    placeholder='Nh???p t??n'
                                    onChange={(event, data) => { setName(data.value); setAlias(toLowerCaseNonAccentVietnamese(data.value)) }}

                                />
                            </Form.Field>

                            <Form.Field>
                                <Input
                                    icon='amilia'
                                    iconPosition='left'
                                    label={{ tag: true, content: 'B?? danh (Alias)' }}
                                    labelPosition='right'
                                    placeholder='Nh???p b?? danh'
                                    value={alias}
                                    onChange={(event, data) => { setAlias(data.value) }}
                                />
                            </Form.Field>

                            <Form.Field>
                                <Input
                                    icon='time'
                                    iconPosition='left'
                                    label={{ tag: true, content: 'Th???i l?????ng (ph??t)', }}
                                    labelPosition='right'
                                    placeholder='Nh???p th???i l?????ng'
                                    type='number'
                                    value={duration}
                                    onChange={(event, data) => { setDuration(Number.parseInt(data.value)) }}
                                />
                            </Form.Field>

                            <Form.Field>
                                <Input
                                    icon='calendar alternate'
                                    iconPosition='left'
                                    label={{ tag: true, content: 'Ng??y c??ng chi???u' }}
                                    labelPosition='right'
                                    placeholder='Ng??y c??ng chi???u'
                                    type='date'
                                    value={releaseDate}
                                    onChange={(event, data) => { setReleaseDate(data.value) }}
                                />
                            </Form.Field>

                            <Form.Field>
                                <Input
                                    icon='file image'
                                    iconPosition='left'
                                    label={{ tag: true, content: 'H??nh ???nh' }}
                                    labelPosition='right'
                                    placeholder='H??nh ???nh'
                                    type='file'
                                    accept={AcceptedImgFileType}
                                    onChange={(event, data) => { setImage(event.target.files![0]); console.log(event.target.files![0], "imgage") }}
                                />
                            </Form.Field>

                            


                            <Form.Field>
                                <DropdownComponent
                                    loading={status_nationalities === "loading"}
                                    placeholder='Ch???n qu???c gia'
                                    selection
                                    search
                                    dataOption={dataNationalitiesOption}
                                    onSelectChange={HandleNationalityChange}
                                />
                            </Form.Field>

                           

                            <Form.Field>
                                <Editor
                                    apiKey='yillg49dt4io6vjxyvs8k26ldhgtxqnmurmteil8v2j6mljb'
                                    onInit={(evt, editor) => editorRef.current = editor}
                                    initialValue="<p>Nh???p ti???u s???.</p>"
                                    init={{
                                        height: 500,
                                        menubar: false,
                                        plugins: [
                                            'advlist autolink lists link image charmap print preview anchor',
                                            'searchreplace visualblocks code fullscreen',
                                            'insertdatetime media table paste code help wordcount'
                                        ],
                                        toolbar: 'undo redo | formatselect | ' +
                                            'bold italic backcolor | alignleft aligncenter ' +
                                            'alignright alignjustify | bullist numlist outdent indent | ' +
                                            'removeformat | help',
                                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                                    }}
                                    onEditorChange={(newText) => { setContent(newText); }}
                                />
                            </Form.Field>


                        </Form>
                    </Container>
                </DialogContent>
                <DialogActions>
                    <Button color='blue' onClick={handleConfirmAdd}>X??c nh???n l??u</Button>
                    <Button color='red' onClick={handleCancelAdd} autoFocus>
                        Hu??? b??? l??u
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar open={open} anchorOrigin={{ horizontal: "center", vertical: "top" }} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={error ? "error" : status_create === "added" ? "success" : undefined} sx={{ width: '100%' }}>
                    {messageCreate}
                </Alert>
            </Snackbar>
        </>

    )
}
export default AddNewMovie;