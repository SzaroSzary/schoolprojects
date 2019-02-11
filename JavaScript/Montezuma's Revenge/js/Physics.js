var Physics = function () {
    this.check = function () {

        var leftpix
        var centerpix
        var rightpix
        
        if (Character.character[0].stand) {
            leftpix = ctx1.getImageData(
                Character.character[0].offsetX + (Math.floor(Character.character[0].width / 4)-15),
                Character.character[0].offsetY + Character.character[0].height + 1,
                1,
                1).data
            centerpix = ctx1.getImageData(
                Character.character[0].offsetX + Math.floor(Character.character[0].width / 4),
                Character.character[0].offsetY + Character.character[0].height + 1,
                1,
                1).data
            rightpix = ctx1.getImageData(
                Character.character[0].offsetX + Math.floor((Character.character[0].width / 12) * 3),
                Character.character[0].offsetY + Character.character[0].height + 1,
                1,
                1).data
        }
        else {
            leftpix = ctx1.getImageData(
                Character.character[0].offsetX + Math.floor(Character.character[0].width / 12),
                Character.character[0].offsetY + Character.character[0].height + 1,
                1,
                1).data
            centerpix = ctx1.getImageData(
                Character.character[0].offsetX + Math.floor(Character.character[0].width / 6),
                Character.character[0].offsetY + Character.character[0].height + 1,
                1,
                1).data
            rightpix = ctx1.getImageData(
                Character.character[0].offsetX + Math.floor((Character.character[0].width / 12) * 3),
                Character.character[0].offsetY + Character.character[0].height + 1,
                1,
                1).data
        }

        var leftpixcolor = "" + leftpix[0] + leftpix[1] + leftpix[2]
        var centerpixcolor = "" + centerpix[0] + centerpix[1] + centerpix[2]
        var rightpixcolor = "" + rightpix[0] + rightpix[1] + rightpix[2]

        if (leftpixcolor == "000" && centerpixcolor == "000" && rightpixcolor == "000") {
            return true
        }
        else {
            if (Character.character[0].stand) {
                leftpix = ctx1.getImageData(
                    Character.character[0].offsetX + (Math.floor(Character.character[0].width / 4) - 15),
                    Character.character[0].offsetY + Character.character[0].height + 10,
                    1,
                    1).data
                centerpix = ctx1.getImageData(
                    Character.character[0].offsetX + Math.floor(Character.character[0].width / 4),
                    Character.character[0].offsetY + Character.character[0].height + 10,
                    1,
                    1).data
                rightpix = ctx1.getImageData(
                    Character.character[0].offsetX + Math.floor((Character.character[0].width / 12) * 3),
                    Character.character[0].offsetY + Character.character[0].height + 10,
                    1,
                    1).data
            }
            else {
                leftpix = ctx1.getImageData(
                    Character.character[0].offsetX + Math.floor(Character.character[0].width / 12),
                    Character.character[0].offsetY + Character.character[0].height + 10,
                    1,
                    1).data
                centerpix = ctx1.getImageData(
                    Character.character[0].offsetX + Math.floor(Character.character[0].width / 6),
                    Character.character[0].offsetY + Character.character[0].height + 10,
                    1,
                    1).data
                rightpix = ctx1.getImageData(
                    Character.character[0].offsetX + Math.floor((Character.character[0].width / 12) * 3),
                    Character.character[0].offsetY + Character.character[0].height + 10,
                    1,
                    1).data
            }

            var leftpixcolor = "" + leftpix[0] + leftpix[1] + leftpix[2]
            var centerpixcolor = "" + centerpix[0] + centerpix[1] + centerpix[2]
            var rightpixcolor = "" + rightpix[0] + rightpix[1] + rightpix[2]

            if (leftpixcolor == "000" && centerpixcolor == "000" && rightpixcolor == "000") {
                return true
            }

        }
        return false
    }
}