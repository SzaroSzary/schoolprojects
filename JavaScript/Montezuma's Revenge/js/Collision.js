var Collision = function () {
    this.checkhitCollision = function () {

        var leftpix = ctx3.getImageData(
            Character.character[0].offsetX + 3,
            Character.character[0].offsetY + (Character.character[0].height / 2) + 4,
            1,
            1).data

        var leftpixcolor = "" + leftpix[0] + leftpix[1] + leftpix[2]

        if (leftpixcolor == "230230230" || leftpixcolor == "28159103") {
            return false
        }
        leftpix = ctx3.getImageData(
            Character.character[0].offsetX + 3,
            Character.character[0].offsetY + Character.character[0].height - 4,
            1,
            1).data

        leftpixcolor = "" + leftpix[0] + leftpix[1] + leftpix[2]

        if (leftpixcolor == "230230230" || leftpixcolor == "28159103") {
            return false
        }
        var rightpix = ctx3.getImageData(
            Character.character[0].offsetX + (Character.character[0].width / 3) -3,
            Character.character[0].offsetY + (Character.character[0].height / 2) + 4,
            1,
            1).data

        var rightpixcolor = "" + rightpix[0] + rightpix[1] + rightpix[2]

        if (rightpixcolor == "230230230" || rightpixcolor == "28159103") {
            return false
        }

        rightpix = ctx3.getImageData(
            Character.character[0].offsetX + (Character.character[0].width / 3) - 3,
            Character.character[0].offsetY + Character.character[0].height - 4,
            1,
            1).data

        rightpixcolor = "" + rightpix[0] + rightpix[1] + rightpix[2]

        if (rightpixcolor == "230230230" || rightpixcolor == "28159103") {
            return false
        }

        var downpix = ctx3.getImageData(
            Character.character[0].offsetX + (Character.character[0].width / 6),
            Character.character[0].offsetY + Character.character[0].height - 3,
            1,
            1).data
        var downpixcolor = "" + downpix[0] + downpix[1] + downpix[2]

        if (downpixcolor == "230230230" || downpixcolor == "28159103") {
            return false
        }

        var uppix = ctx3.getImageData(
            Character.character[0].offsetX + (Character.character[0].width / 6),
            Character.character[0].offsetY + (Character.character[0].height - 1),
            1,
            1).data

        var uppixcolor = "" + uppix[0] + uppix[1] + uppix[2]

        if (uppixcolor == "230230230" || uppixcolor == "28159103") {
            return false
        }
        return true
    }

    this.checkleftCollision = function () {

        var leftpix = ctx1.getImageData(
            Character.character[0].offsetX - 1,
            Character.character[0].offsetY + (Character.character[0].height / 2) + 4,
            1,
            1).data        

        var leftpixcolor = "" + leftpix[0] + leftpix[1] + leftpix[2]

        if (leftpixcolor == "000" || leftpixcolor == "111" || leftpixcolor == "00255" || leftpixcolor == "170170170" || leftpixcolor == "255103103" || leftpixcolor == "255102102" || leftpixcolor == "255101101" || leftpixcolor == "168168169" || leftpixcolor == "25520115" || leftpixcolor == "1165354" || leftpixcolor == "6372205" || leftpixcolor == "19300") {

            leftpix = ctx1.getImageData(
                Character.character[0].offsetX - 1,
                Character.character[0].offsetY + Character.character[0].height - 4,
                1,
                1).data

            leftpixcolor = "" + leftpix[0] + leftpix[1] + leftpix[2]

            if (leftpixcolor == "000" || leftpixcolor == "111" || leftpixcolor == "00255" || leftpixcolor == "170170170" || leftpixcolor == "255103103" || leftpixcolor == "255102102" || leftpixcolor == "255101101" || leftpixcolor == "168168169" || leftpixcolor == "25520115" || leftpixcolor == "1165354" || leftpixcolor == "6372205" || leftpixcolor == "19300") {
                return false
            }

        }
        return true
    }

    this.checkrightCollision = function () {

        var rightpix = ctx1.getImageData(
            Character.character[0].offsetX + (Character.character[0].width / 3) + 1,
            Character.character[0].offsetY + (Character.character[0].height / 2) + 4,
            1,
            1).data

        var rightpixcolor = "" + rightpix[0] + rightpix[1] + rightpix[2]

        if (rightpixcolor == "000" || rightpixcolor == "111" || rightpixcolor == "00255" || rightpixcolor == "170170170" || rightpixcolor == "255103103" || rightpixcolor == "255102102" || rightpixcolor == "255101101" || rightpixcolor == "168168169" || rightpixcolor == "25520115" || rightpixcolor == "1165354" || rightpixcolor == "6372205" || rightpixcolor == "19300") {

            rightpix = ctx1.getImageData(
                Character.character[0].offsetX + (Character.character[0].width / 3) + 1,
                Character.character[0].offsetY + Character.character[0].height - 4,
                1,
                1).data

            rightpixcolor = "" + rightpix[0] + rightpix[1] + rightpix[2]

            if (rightpixcolor == "000" || rightpixcolor == "111" || rightpixcolor == "00255" || rightpixcolor == "170170170" || rightpixcolor == "255103103" || rightpixcolor == "255102102" || rightpixcolor == "255101101" || rightpixcolor == "168168169" || rightpixcolor == "25520115" || rightpixcolor == "1165354" || rightpixcolor == "6372205" || rightpixcolor == "19300") {
                return false
            }
        }
        return true
    }

    this.checkdownCollision = function () {

        var downpix = ctx1.getImageData(
            Character.character[0].offsetX + (Character.character[0].width / 6),
            Character.character[0].offsetY + Character.character[0].height + 13,
            1,
            1).data
        var downpixcolor = "" + downpix[0] + downpix[1] + downpix[2]

        if (downpixcolor == "255101101" || downpixcolor == "255102102") {
            return true
        }

        downpix = ctx1.getImageData(
            Character.character[0].offsetX + (Character.character[0].width / 6),
            Character.character[0].offsetY + Character.character[0].height + 1,
            1,
            1).data

        downpixcolor = "" + downpix[0] + downpix[1] + downpix[2]

        if (downpixcolor == "00255" || downpixcolor == "222" || downpixcolor == "169169169" || downpixcolor == "111") {
            return false
        }

        if (downpixcolor == "255100100" || downpixcolor == "2062060") {
            downpix = ctx1.getImageData(
                Character.character[0].offsetX + (Character.character[0].width / 6),
                Character.character[0].offsetY + Character.character[0].height + 29,
                1,
                1).data
            downpixcolor = "" + downpix[0] + downpix[1] + downpix[2]


            if (downpixcolor == "00255" || downpixcolor == "111") {
                return false
            }
        }
        return true
    }

    this.checkupCollision = function () {
        var uppix = ctx1.getImageData(
            Character.character[0].offsetX + (Character.character[0].width / 6),
            Character.character[0].offsetY + (Character.character[0].height - 1),
            1,
            1).data

        var uppixcolor = "" + uppix[0] + uppix[1] + uppix[2]

        if (uppixcolor == "00255" || uppixcolor == "111") {
            return false
        }
        return true
    }

    this.checkleftsliderCollision = function () {

        var downrightpix = ctx1.getImageData(
            Character.character[0].offsetX + (Character.character[0].width / 3),
            Character.character[0].offsetY + (Character.character[0].height + 13),
            1,
            1).data

        var downrightpixcolor = "" + downrightpix[0] + downrightpix[1] + downrightpix[2]

        var downleftpix = ctx1.getImageData(
            Character.character[0].offsetX,
            Character.character[0].offsetY + (Character.character[0].height + 13),
            1,
            1).data

        var downleftpixcolor = "" + downleftpix[0] + downleftpix[1] + downleftpix[2]

        if (downrightpixcolor == "255101101" || downleftpixcolor == "255101101") {
            return false
        }
        return true
    }

    this.checkrightsliderCollision = function () {

        var downrightpix = ctx1.getImageData(
            Character.character[0].offsetX + (Character.character[0].width / 3),
            Character.character[0].offsetY + (Character.character[0].height + 13),
            1,
            1).data

        var downrightpixcolor = "" + downrightpix[0] + downrightpix[1] + downrightpix[2]

        var downleftpix = ctx1.getImageData(
            Character.character[0].offsetX,
            Character.character[0].offsetY + (Character.character[0].height + 13),
            1,
            1).data

        var downleftpixcolor = "" + downleftpix[0] + downleftpix[1] + downleftpix[2]

        if (downrightpixcolor == "255102102" || downleftpixcolor == "255102102") {
            return false
        }
        return true
    }

    this.checkchainCollision = function () {
        var upleftpix = ctx1.getImageData(
            Character.character[0].offsetX + (Character.character[0].width / 12),
            Character.character[0].offsetY + (Character.character[0].height / 2),
            1,
            1).data

        var upcenterpix = ctx1.getImageData(
            Character.character[0].offsetX + (Character.character[0].width / 6),
            Character.character[0].offsetY + (Character.character[0].height / 2),
            1,
            1).data

        var uprightpix = ctx1.getImageData(
            Character.character[0].offsetX + ((Character.character[0].width / 12)*3),
            Character.character[0].offsetY + (Character.character[0].height / 2),
            1,
            1).data

        var downleftpix = ctx1.getImageData(
            Character.character[0].offsetX,
            Character.character[0].offsetY + (Character.character[0].height / 2),
            1,
            1).data

        var downcenterpix = ctx1.getImageData(
            Character.character[0].offsetX + (Character.character[0].width / 6),
            Character.character[0].offsetY + (Character.character[0].height / 2),
            1,
            1).data

        var downrightpix = ctx1.getImageData(
            Character.character[0].offsetX + (Character.character[0].width / 3),
            Character.character[0].offsetY + (Character.character[0].height / 2),
            1,
            1).data

        var upleftpixcolor = "" + upleftpix[0] + upleftpix[1] + upleftpix[2]
        var upcenterpixcolor = "" + upcenterpix[0] + upcenterpix[1] + upcenterpix[2]
        var uprightpixcolor = "" + uprightpix[0] + uprightpix[1] + uprightpix[2]

        var downleftpixcolor = "" + downleftpix[0] + downleftpix[1] + downleftpix[2]
        var downcenterpixcolor = "" + downcenterpix[0] + downcenterpix[1] + downcenterpix[2]
        var downrightpixcolor = "" + downrightpix[0] + downrightpix[1] + downrightpix[2]

        if (upleftpixcolor == "169169169" || upcenterpixcolor == "169169169" || uprightpixcolor == "169169169") {
            return false
        }
        if (downleftpixcolor == "169169169" || downcenterpixcolor == "169169169" || downrightpixcolor == "169169169") {
            return false
        }
        if (upleftpixcolor == "222" || upcenterpixcolor == "222" || uprightpixcolor == "222") {
            return false
        }
        if (downleftpixcolor == "222" || downcenterpixcolor == "222" || downrightpixcolor == "222") {
            return false
        }
        return true
    }

    this.checkgreykeyCollision = function () {
        var upleftpix = ctx1.getImageData(
            Character.character[0].offsetX + (Character.character[0].width / 12),
            Character.character[0].offsetY + ((Character.character[0].height / 3) * 2),
            1,
            1).data

        var upcenterpix = ctx1.getImageData(
            Character.character[0].offsetX + (Character.character[0].width / 6),
            Character.character[0].offsetY + ((Character.character[0].height / 3) * 2),
            1,
            1).data

        var uprightpix = ctx1.getImageData(
            Character.character[0].offsetX + ((Character.character[0].width / 12) * 3),
            Character.character[0].offsetY + ((Character.character[0].height / 3) * 2),
            1,
            1).data

        var upleftpixcolor = "" + upleftpix[0] + upleftpix[1] + upleftpix[2]
        var upcenterpixcolor = "" + upcenterpix[0] + upcenterpix[1] + upcenterpix[2]
        var uprightpixcolor = "" + uprightpix[0] + uprightpix[1] + uprightpix[2]

        if (upleftpixcolor == "195195195" || upcenterpixcolor == "195195195" || uprightpixcolor == "195195195") {
            return false
        }
        return true
    }

    this.checkbrownkeyCollision = function () {
        var upleftpix = ctx1.getImageData(
            Character.character[0].offsetX + (Character.character[0].width / 12),
            Character.character[0].offsetY + ((Character.character[0].height / 3) * 2),
            1,
            1).data

        var upcenterpix = ctx1.getImageData(
            Character.character[0].offsetX + (Character.character[0].width / 6),
            Character.character[0].offsetY + ((Character.character[0].height / 3) * 2),
            1,
            1).data

        var uprightpix = ctx1.getImageData(
            Character.character[0].offsetX + ((Character.character[0].width / 12) * 3),
            Character.character[0].offsetY + ((Character.character[0].height / 3) * 2),
            1,
            1).data

        var upleftpixcolor = "" + upleftpix[0] + upleftpix[1] + upleftpix[2]
        var upcenterpixcolor = "" + upcenterpix[0] + upcenterpix[1] + upcenterpix[2]
        var uprightpixcolor = "" + uprightpix[0] + uprightpix[1] + uprightpix[2]

        if (upleftpixcolor == "1165353" || upcenterpixcolor == "1165353" || uprightpixcolor == "1165353") {
            return false
        }
        return true
    }

    this.checkbluekeyCollision = function () {
        var upleftpix = ctx1.getImageData(
            Character.character[0].offsetX + (Character.character[0].width / 12),
            Character.character[0].offsetY + ((Character.character[0].height / 3) * 2),
            1,
            1).data

        var upcenterpix = ctx1.getImageData(
            Character.character[0].offsetX + (Character.character[0].width / 6),
            Character.character[0].offsetY + ((Character.character[0].height / 3) * 2),
            1,
            1).data

        var uprightpix = ctx1.getImageData(
            Character.character[0].offsetX + ((Character.character[0].width / 12) * 3),
            Character.character[0].offsetY + ((Character.character[0].height / 3) * 2),
            1,
            1).data

        var upleftpixcolor = "" + upleftpix[0] + upleftpix[1] + upleftpix[2]
        var upcenterpixcolor = "" + upcenterpix[0] + upcenterpix[1] + upcenterpix[2]
        var uprightpixcolor = "" + uprightpix[0] + uprightpix[1] + uprightpix[2]

        if (upleftpixcolor == "6372204" || upcenterpixcolor == "6372204" || uprightpixcolor == "6372204") {
            return false
        }
        return true
    }

    this.checkgoldkeyCollision = function () {
        var upleftpix = ctx1.getImageData(
            Character.character[0].offsetX + (Character.character[0].width / 12),
            Character.character[0].offsetY + ((Character.character[0].height / 3) * 2),
            1,
            1).data

        var upcenterpix = ctx1.getImageData(
            Character.character[0].offsetX + (Character.character[0].width / 6),
            Character.character[0].offsetY + ((Character.character[0].height / 3) * 2),
            1,
            1).data

        var uprightpix = ctx1.getImageData(
            Character.character[0].offsetX + ((Character.character[0].width / 12) * 3),
            Character.character[0].offsetY + ((Character.character[0].height / 3) * 2),
            1,
            1).data

        var upleftpixcolor = "" + upleftpix[0] + upleftpix[1] + upleftpix[2]
        var upcenterpixcolor = "" + upcenterpix[0] + upcenterpix[1] + upcenterpix[2]
        var uprightpixcolor = "" + uprightpix[0] + uprightpix[1] + uprightpix[2]

        if (upleftpixcolor == "25520114" || upcenterpixcolor == "25520114" || uprightpixcolor == "25520114") {
            return false
        }
        return true
    }

    this.checkcoinCollision = function () {
        var upleftpix = ctx1.getImageData(
            Character.character[0].offsetX + (Character.character[0].width / 12),
            Character.character[0].offsetY + ((Character.character[0].height / 3) * 2),
            1,
            1).data

        var upcenterpix = ctx1.getImageData(
            Character.character[0].offsetX + (Character.character[0].width / 6),
            Character.character[0].offsetY + ((Character.character[0].height / 3) * 2),
            1,
            1).data

        var uprightpix = ctx1.getImageData(
            Character.character[0].offsetX + ((Character.character[0].width / 12) * 3),
            Character.character[0].offsetY + ((Character.character[0].height / 3) * 2),
            1,
            1).data

        var upleftpixcolor = "" + upleftpix[0] + upleftpix[1] + upleftpix[2]
        var upcenterpixcolor = "" + upcenterpix[0] + upcenterpix[1] + upcenterpix[2]
        var uprightpixcolor = "" + uprightpix[0] + uprightpix[1] + uprightpix[2]

        if (upleftpixcolor == "19300" || upcenterpixcolor == "19300" || uprightpixcolor == "19300") {
            return false
        }
        return true
    }
    this.checkpipeCollision = function () {

        var downcenterpix = ctx1.getImageData(
            Character.character[0].offsetX + (Character.character[0].width / 6),
            Character.character[0].offsetY + Character.character[0].height,
            1,
            1).data

        var downcenterpixnext = ctx1.getImageData(
            Character.character[0].offsetX + (Character.character[0].width / 6),
            Character.character[0].offsetY + Character.character[0].height + 5,
            1,
            1).data

        var downcenterpixcolor = "" + downcenterpix[0] + downcenterpix[1] + downcenterpix[2]
        var downcenterpixnextcolor = "" + downcenterpixnext[0] + downcenterpixnext[1] + downcenterpixnext[2]

        if (downcenterpixnextcolor == "255100100" || downcenterpixnextcolor == "2062060") {
            return true
        }

        if (downcenterpixcolor == "170170170" || downcenterpixcolor == "255103103") {
            return false
        }

        return true
    }

    this.laserCollision = function () {
        var uppix = ctx1.getImageData(
            Character.character[0].offsetX + (Character.character[0].width / 6),
            Character.character[0].offsetY + (Character.character[0].height + 4),
            1,
            1).data

        var uppixcolor = "" + uppix[0] + uppix[1] + uppix[2]

        if (uppixcolor == "11255" || uppixcolor == "118118254" || uppixcolor == "255104104" || uppixcolor == "9800" ) {
            return false
        }
        return true
    }

    this.greydoorCollision = function () {
        var leftpix = ctx1.getImageData(
            Character.character[0].offsetX + (Character.character[0].width / 3)+1,
            Character.character[0].offsetY + Character.character[0].height - 5,
            1,
            1).data

        var rightpix = ctx1.getImageData(
            Character.character[0].offsetX - 7,
            Character.character[0].offsetY + Character.character[0].height - 5,
            1,
            1).data

        var leftpixcolor = "" + leftpix[0] + leftpix[1] + leftpix[2]
        var rightpixcolor = "" + rightpix[0] + rightpix[1] + rightpix[2]

        if (leftpixcolor == "168168168" || rightpixcolor == "168168168" ) {
            return 1
        }
        if (leftpixcolor == "167167167" || rightpixcolor == "167167167") {
            return 2
        }
        if (leftpixcolor == "166166166" || rightpixcolor == "166166166") {
            return 3
        }
        if (leftpixcolor == "165165165" || rightpixcolor == "165165165") {
            return 4
        }
        return 0
    }

    this.browndoorCollision = function () {
        var leftpix = ctx1.getImageData(
            Character.character[0].offsetX + (Character.character[0].width / 3) + 1,
            Character.character[0].offsetY + Character.character[0].height - 5,
            1,
            1).data

        var rightpix = ctx1.getImageData(
            Character.character[0].offsetX - 7,
            Character.character[0].offsetY + Character.character[0].height - 5,
            1,
            1).data

        var leftpixcolor = "" + leftpix[0] + leftpix[1] + leftpix[2]
        var rightpixcolor = "" + rightpix[0] + rightpix[1] + rightpix[2]

        if (leftpixcolor == "1165353" || rightpixcolor == "1165353") {
            return 1
        }
        if (leftpixcolor == "1155353" || rightpixcolor == "1155353") {
            return 2
        }
        if (leftpixcolor == "1145353" || rightpixcolor == "1145353") {
            return 3
        }
        if (leftpixcolor == "1135353" || rightpixcolor == "1135353") {
            return 4
        }
        return 0
    }

    this.bluedoorCollision = function () {
        var leftpix = ctx1.getImageData(
            Character.character[0].offsetX + (Character.character[0].width / 3) + 1,
            Character.character[0].offsetY + Character.character[0].height - 5,
            1,
            1).data

        var rightpix = ctx1.getImageData(
            Character.character[0].offsetX - 7,
            Character.character[0].offsetY + Character.character[0].height - 5,
            1,
            1).data

        var leftpixcolor = "" + leftpix[0] + leftpix[1] + leftpix[2]
        var rightpixcolor = "" + rightpix[0] + rightpix[1] + rightpix[2]

        if (leftpixcolor == "6372204" || rightpixcolor == "6372204") {
            return 1
        }
        if (leftpixcolor == "6272204" || rightpixcolor == "6272204") {
            return 2
        }
        if (leftpixcolor == "6172204" || rightpixcolor == "6172204") {
            return 3
        }
        if (leftpixcolor == "6072204" || rightpixcolor == "6072204") {
            return 4
        }
        return 0
    }

    this.golddoorCollision = function () {
        var leftpix = ctx1.getImageData(
            Character.character[0].offsetX + (Character.character[0].width / 3) + 1,
            Character.character[0].offsetY + Character.character[0].height - 5,
            1,
            1).data

        var rightpix = ctx1.getImageData(
            Character.character[0].offsetX - 7,
            Character.character[0].offsetY + Character.character[0].height - 5,
            1,
            1).data

        var leftpixcolor = "" + leftpix[0] + leftpix[1] + leftpix[2]
        var rightpixcolor = "" + rightpix[0] + rightpix[1] + rightpix[2]

        if (leftpixcolor == "25520114" || rightpixcolor == "25520114") {
            return 1
        }
        if (leftpixcolor == "25520113" || rightpixcolor == "25520113") {
            return 2
        }
        if (leftpixcolor == "25520112" || rightpixcolor == "25520112") {
            return 3
        }
        if (leftpixcolor == "25520111" || rightpixcolor == "25520111") {
            return 4
        }
        return 0
    }

    this.skullleftCollision = function (enemy) {
        var leftpix = ctx1.getImageData(
            enemy.offsetX - 1,
            enemy.offsetY + (enemy.height / 2) + 4,
            1,
            1).data

        var leftpixcolor = "" + leftpix[0] + leftpix[1] + leftpix[2]

        if (leftpixcolor == "000" || leftpixcolor == "111" || leftpixcolor == "00255" || leftpixcolor == "170170170" || leftpixcolor == "255103103" || leftpixcolor == "255102102" || leftpixcolor == "255101101" || leftpixcolor == "168168169" || leftpixcolor == "25520115" || leftpixcolor == "1165354" || leftpixcolor == "6372205") {

            leftpix = ctx1.getImageData(
                enemy.offsetX - 1,
                enemy.offsetY + enemy.height - 4,
                1,
                1).data

            leftpixcolor = "" + leftpix[0] + leftpix[1] + leftpix[2]

            if (leftpixcolor == "000" || leftpixcolor == "111" || leftpixcolor == "00255" || leftpixcolor == "170170170" || leftpixcolor == "255103103" || leftpixcolor == "255102102" || leftpixcolor == "255101101" || leftpixcolor == "168168169" || leftpixcolor == "25520115" || leftpixcolor == "1165354" || leftpixcolor == "6372205") {

                leftpix = ctx1.getImageData(
                    enemy.offsetX - 2,
                    enemy.offsetY + enemy.height + 4,
                    1,
                    1).data

                leftpixcolor = "" + leftpix[0] + leftpix[1] + leftpix[2]
                if (leftpixcolor == "000") {
                    return true
                }

                return false
            }

        }
        return true
    }

    this.skullrightCollision = function (enemy) {

        var rightpix = ctx1.getImageData(
            enemy.offsetX + (enemy.width / 16) + 1,
            enemy.offsetY + (enemy.height / 2) + 4,
            1,
            1).data

        var rightpixcolor = "" + rightpix[0] + rightpix[1] + rightpix[2]

        if (rightpixcolor == "000" || rightpixcolor == "111" || rightpixcolor == "00255" || rightpixcolor == "170170170" || rightpixcolor == "255103103" || rightpixcolor == "255102102" || rightpixcolor == "255101101" || rightpixcolor == "168168169" || rightpixcolor == "25520115" || rightpixcolor == "1165354" || rightpixcolor == "6372205") {

            rightpix = ctx1.getImageData(
                enemy.offsetX + (enemy.width / 16) + 1,
                enemy.offsetY + enemy.height - 4,
                1,
                1).data

            rightpixcolor = "" + rightpix[0] + rightpix[1] + rightpix[2]

            if (rightpixcolor == "000" || rightpixcolor == "111" || rightpixcolor == "00255" || rightpixcolor == "170170170" || rightpixcolor == "255103103" || rightpixcolor == "255102102" || rightpixcolor == "255101101" || rightpixcolor == "168168169" || rightpixcolor == "25520115" || rightpixcolor == "1165354" || rightpixcolor == "6372205") {

                rightpix = ctx1.getImageData(
                    enemy.offsetX + (enemy.width / 16) + 2,
                    enemy.offsetY + enemy.height + 4,
                    1,
                    1).data

                rightpixcolor = "" + rightpix[0] + rightpix[1] + rightpix[2]
                if (rightpixcolor == "000") {
                    return true
                }
                return false
            }
        }
        return true
    }
}