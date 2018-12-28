<template>
    <div>
        <div class="container">
            <p>Game - {{ gameId }}</p>

            <div class="chess-board" v-if="board" :style="dropping ? 'display: none;' : ''">
                <div :class="getChessRowClass(index)" v-for="(row, index) in board">
                    <div v-for="tile in row">
                        <div class="chess-tile" :class="recentlyMoved(tile) ? 'light-tile' : ''">
                            <drag class="chess-piece"
                                  v-if="tile.piece"
                                  :transfer-data="tile.location"
                                  @dragstart="dropping = true"
                                  @dragend="dropping = false">
                                <i :class="getPieceClass(tile.piece)"></i>
                            </drag>
                        </div>
                    </div>
                </div>
            </div>

            <div class="chess-board" v-if="board" :style="!dropping ? 'display: none;' : ''">
                <div :class="getChessRowClass(index)" v-for="(row, index) in board">
                    <div v-for="tile in row">
                        <div class="chess-tile">
                            <drop class="chess-tile-drop"
                                  :v-if="dropping"
                                  @drop="handleDrop(tile.location, ...arguments)">
                                <i :class="getPieceClass(tile.piece)" v-if="tile.piece"></i>
                            </drop>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    let socket = io.connect('http://localhost:4000/');

    export default {

        data() {
            return {
                gameId: this.$route.params.id,
                dropping: false,
                board: null,
            };
        },

        created() {
            this.registerSocketListeners();
            this.joinGame(this.gameId);
        },

        methods: {
            registerSocketListeners() {
                socket.on('load-board', data => {
                    this.board = data.board;
                    this.dropping = false;
                });

                socket.on('game-not-found', () => {
                    this.$router.push({name: 'home'});
                });
            },

            joinGame(gameId) {
                socket.emit('join-game', {gameId});
            },

            getPieceClass(piece) {
                return 'fas fa-chess-' + piece.name + ' ' + (piece.white ? 'white' : 'black');
            },

            getChessRowClass(index) {
                return 'chess-row ' + (index % 2 === 0 ? 'invert' : '');
            },

            handleDrop(to, from) {
                if (!location) {
                    return;
                }

                if (!location) {
                    return;
                }

                socket.emit('move-piece', {from, to, gameId: this.gameId});
            },

            /**
             * @param {object} tile
             * @param {object} tile.piece
             * @returns {*}
             */
            recentlyMoved(tile) {
                if (!tile.piece) {
                    return false;
                }

                return tile.piece.recentlyMoved;
            }
        },
    };
</script>

<style scoped>
    .chess-board {
        display: block;
        height: 600px;
        width: 600px;
    }

    .chess-tile {
        position: relative;
        display: block;
        height: 75px;
        width: 75px;
        background-color: #4e6088;
        font-size: 50px;
        text-align: center;
        float: left;
    }

    .chess-tile-drop {
        position: absolute;
        z-index: 99999;
        display: block;
        height: 75px;
        width: 75px;
        float: left;
    }

    .chess-piece {
        display: block;
        width: 75px;
        height: 75px;
    }

    .light-tile {
        background-color: #4e599d !important;
    }

    .chess-row > div:nth-child(2n+1) > .chess-tile {
        background-color: #3b4d75;
    }

    .chess-row.invert > div:nth-child(2n) > .chess-tile {
        background-color: #3b4d75;
    }

    .chess-row.invert > div:nth-child(2n+1) > .chess-tile {
        background-color: #4e6088;
    }

    .black {
        color: #111;
    }

    .white {
        color: #efefef;
    }
</style>