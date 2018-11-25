<template>
    <div>
        <div class="container">
            <p>Game - {{ gameId }}</p>

            <div class="chess-board" v-if="board">
                <div class="chess-row" :class="index % 2 === 0 ? 'invert' : ''" v-for="(row, index) in board">
                    <div class="chess-tile" v-for="piece in row">
                        <div class="chess-piece" v-if="piece">
                            <i class="fas"
                               :class="'fa-chess-' + piece.piece + ' ' + (piece.white ? 'white' : 'black')">
                            </i>
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
                });

                socket.on('game-not-found', () => {
                    this.$router.push({name: 'home'});
                });
            },

            joinGame(gameId) {
                socket.emit('join-game', {gameId});
            },

            movePiece(event) {
                console.log(event);
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
        display: block;
        height: 75px;
        width: 75px;
        background-color: #4e6088;
    }

    .chess-row > .chess-tile:nth-child(2n+1) {
        background-color: #3b4d75;
    }

    .chess-row.invert > .chess-tile:nth-child(2n) {
        background-color: #3b4d75;
    }

    .chess-row.invert > .chess-tile:nth-child(2n+1) {
        background-color: #4e6088;
    }

    .chess-row {
        float: left;
    }

    .chess-tile {
        font-size: 50px;
        text-align: center;
    }

    .chess-piece {
        display: block;
        width: 75px;
        height: 75px;
    }

    .black {
        color: #111;
    }

    .white {
        color: #efefef;
    }
</style>