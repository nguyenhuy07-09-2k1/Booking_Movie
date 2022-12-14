import classNames from "classnames";
import React, { useEffect, useState } from "react"
import ReactPlayer from "react-player"
import { Link } from "react-router-dom";
import { Grid, Button, Icon, Header, Image } from "semantic-ui-react";
import { MovieModel } from "../../../slices/movie/movieSlice"

const MovieBG: React.FC<{ movies: MovieModel[] }> = ({ movies }) => {
    const [muted, setMuted] = useState(true);
    const [movieBG, setMovieBG] = useState({} as MovieModel);
    const [isPlaying, setIsPlaying] = useState(false);
    useEffect(() => {
        setMovieBG(movies[Math.floor(Math.random() * movies.length)])
        console.log(movieBG, "movieRand")
    }, [movies])
    return (
        <>
            <div className="absolute flex w-full top-0 left-0" style={{ "zIndex": "-1" }}>
                {isPlaying && <Image className='w-full' src={movieBG && movieBG.imageBackground}></Image>}
                <ReactPlayer
                    width={"100%"}
                    // height={"40%"}
                    url={movieBG && movieBG.videoTrailer}
                    playing={true}
                    muted={muted}
                    onReady={(player) => {setIsPlaying(true)}}
                    onEnded={() => setIsPlaying(false)}
                />
            </div>

            <Grid className="absolute right-10 top-1/3">
                <Grid.Column width={9}>
                    <Button size="big" inverted icon circular basic onClick={() => setMuted((pre) => !pre)} >
                        <Icon size="large" inverted name={muted ? "volume up" : "volume off"} className="text-white" />
                    </Button>
                </Grid.Column>

            </Grid>

            <Grid className="pt-1/12 pb-5">
                <Grid.Column width={6}>             
                    <Header as={"h1"} className={classNames("transition-all ease-in-out delay-1000 duration-4000 text-white  pt-5 text-left leading-tight", {"text-7xl":!isPlaying, }, {"text-4xl pt-1/5":isPlaying, })}>{movieBG && movieBG.name}</Header>

                    <p className="text-white text-xl ">Nh?? du h??nh v?? th??m hi???m th??? gi???i Gulliver ???????c m???i quay tr??? l???i Lilliput - th??? tr???n tr?????c ????y ???? ???????c anh c???u kh???i h???m ?????i k??? th??. Khi ?????n n??i, anh ch??? nh???n th???y s??? ph???n n??? v?? th???t v???ng c???a ????m ????ng v?? huy???n tho???i Gulliver kh???ng l??? gi??? ????y ch??? l?? m???t ng?????i b??nh th?????ng. C??ng l??c ????, k??? th?? l???i ??e d???a x??? x??? n??y th??m m???t l???n n???a.</p>
                    <div className="flex pt-2">
                        <Button size="big" icon labelPosition='left'>
                            <Icon name='ticket' />
                            ?????t v??
                        </Button>
                        <Button as={Link} to={`/movie/${movieBG && movieBG.id}`} size="big" icon labelPosition='left' color="grey">
                            <Icon name='info' />
                            Chi ti???t
                        </Button>
                    </div>
                </Grid.Column>
            </Grid>
        </>
    )
}

export default MovieBG;