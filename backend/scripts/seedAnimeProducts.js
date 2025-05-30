require("dotenv").config({ path: "../.env" });
const mongoose = require("mongoose");
const Product = require("../models/ProductSchema");

// Connect to MongoDB
mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log("MongoDB connected for seeding anime products"))
  .catch((err) => {
    console.error("MongoDB Connection Error:", err);
    process.exit(1);
  });

// Common image to be used for all products
const COMMON_PRODUCT_IMAGE =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMSEhUTEhIWFhUVGRcYFxgYFxcYFxYaGBYYFxYYHR4aHSggGBolGxgYITEiJSkrLi4uFyAzODMsNygtLi0BCgoKDg0OGxAQGy0mICYvLTUvLS8vLS0tMi81Li0tLy0tLS0tLTUtLS0vLS0tLS0tLS0tLS0tLy0tLS0tLS8tLf/AABEIAOEA4QMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAAEAAIDBQYBB//EAEgQAAIBAgMFBAUICAQFBQEAAAECEQADEiExBAVBUWEicYGREzKhsfAGQlJicoKSwRQjM6Ky0eHxFWOzwjRTc6PSFiRDVJMH/8QAGgEAAwEBAQEAAAAAAAAAAAAAAgMEAQAFBv/EADMRAAICAQMCAwYFBAMBAAAAAAABAhEDEiExBEETUfAiMmGxwdEUcZGh4TNCUoEjJHIF/9oADAMBAAIRAxEAPwD3GlQ/p6Z6U0t5Yh6GF1yaDLmdadaeDnQrLbN0bBTNFQ3NoyMCT5TUxoR7RHxNFklJcGRSfJVLfdbkYGgEMVUzE6aVbm+ahw/H9q7FTqUvMom1Kth/pCeNRg5nz+PKuzUV+7h0Ek5AcydB78+ABPCs3YKXkK65nCsYiJM6KPpH2wOMcgSB3eAVTTUsTmx5k/HDhAqc28IiZJzY6Yj/ACGQHQAcKCvCe4eVNS0jccU3YJtDLxb2ZDxJFVe8diW6sSRPGM48as/Rg9rh83rHzvA6dRP0SI3SB5e3T3iuPQxz08Aux7OtoQgjmeJ7zqaNQ1Ne2MSMIgMuIRw0BHcCQPvDkaalnCROnOtdmPLGasenh4ipkPNR5CmmzBwkfHMHh3inBSNdOfEd/wDP3a1xPKSZKCOUe6pAaiVhMTny+OFPArRbJBUlu5FRA11ngUL2AasaWFuIyt8voZ6j6nMfN7tLGxc4VT3bnxqOveK5unaMzbJ9XNCTJKHgTxZTCzyKE5tWaqdgzwtxs0NKmWnkU+qE7VkYqVcJimo811q6OH0qVKtOK8an46flXaRBkZR8f3pGoikR+PdSikaHZp0mKyzGy2ApGoLN/LtZGu3NoHDM1XrjVidLIGGZrkVyaWdSjzoFQ2u1cZjpby+8wBJ8FKgH67CltN9La4rjhV5kwP79KWzIfRhdGbtN9UscR8iSB3dKPGt7NfFkN9ixIBjmeXHCOseQM8RQ962TCCYPfMfOM6zGU8yKsCiquQy0XxzLdSczPjTbK5E84Ud3H4+rTK3GRnStAN+3oBlkB3ToBygRUe0WSVYLqQY74y/KjGMsTXYrhqm1Q1SGtIw0VlI+y/ZJ/C5PgK6y8DQu6GxbMyjgjoPuYkHuqW1tIaPrKGHiM/bNawdLUpLyYVhleq5eH9Kjrlu4Jg5hh59PePGmWiYgmSpgnnGh8RB+9XApNHHtgd38PUch8aU0kqYOh0PvU/WjzGfAxODNIWgQVYSpyPTke8ag9KxG3Q0NTXvgetp7KD2lRZOFmaYnskMIkgEg5iY0nnmYqj3jvPWMX4APaLh91Y/IpxYPE3XBY3Q/pkt2mVhcmJM4AolieJUSB3so4k1bWN2WlzZnds88TKM4kAIQIyGsnISTVHc2cbHa9NcGK+wEyfUxMAEEDQGJMZlegAn3c/prYuMoBbmCSO7OR4VtUdODlHVF+zxfmy8Oy2j9Nfs3LqfwMKmspcTS4bq8nw4h0DKB+8CTzqpW81s5yy6RMnpBOc/VaZkQfmmy2W+CAynI1qmyKcHQfbvBwYyI1B1U9R8A063bg0JtAOTqJZeA+cvFevTqB1o63cDAMDIIBB5g5g0WlN2TPbgdSpUqMAEvXJHcR/L86izPD48Jrm1XAqkk5R8e2qHat4tc5hTwH5k61DOdF2HBKfHBoINcKAiD76zNq4ymVyPx51odiv8ApEDcdD0Pxn40EZ6gs2B41d7E4Ark5/HD+9KK4aYIOk0284UEnQZ8zlyHE05qE2h5IAiEOJifUUgiATxIPawjOVWYma2Kt0akOdQpxEfrWUgCfUGWLMeqoMSeJjXsipNmIwjCScROfEgZM3dlA71qn2u611WFokK0D0hya6x7KAfRtyempjMki72WyqdlRC21W2o5BQPygfdqhV2CnHTHfkZtdyD0A/rXHaEUdCT4jP2k0HvK72GPMx5n+VP3peiRyUe0gfzrLGRx3pXr1uRWbkvH1WPtX+ZojFp1Iqr2K72nP0Un8/yoo3YS0eZt+6aGx08e9EPyZfsuOTXPaSaqbW14PQH/ACp/DccHzBiidwbRht3n4AXG8i4qi225h/QwTGK2V82cj2hfOtqy3HiTyzT818maq7eg5HLIjuYSPaDU36QBcXldXL7SQD4lWQfdqk2e7IwnVQV+6CGU/vMPu1Fe2slJ4peA7g1nF70oUwH017evVmoDQ0c8xT1uwfj4/vVZd2zFbW6NVIDeMD34fA065tGcjQgEeNbZL4LfIXvq0pT0mGfR6iY7BjOemTTyVudZywFfarFsKoGPEYxE9gFxJJ5qBkBrWo2O6HyOjKVPUiSB5FvKsp8n7Xo94lCZw+kInWMOXkCKJK3Y3pnpx5IvlJ16/MK//oBOF/sWz++w9mtFbob9Tb+yKk+WWzelsYlBlZEdGIj99UH3jVb8n7+LZ1IOgitlwMxe10qXk/oXbEEQcwcjQg2g2n4kHP7Q4n7fvMcXyS3Zy0nKeU8ag2m5iSTkVz7o9Yf05gUoV4W9M0ez3xkZkHMEcjx7uNE7vyDL9FiB3EBwPDFHhWW3btuTJPqmR9ljp4N7GUVebu2vtwdGVM+GIF1jvIUHwPSWY2R9RgcEy4pVyaVNITOb8c4gnAZ+J08h76qVMZcp/p7Iq42yHZup/oKqSsMR3fy/KvNzQp2e50+0KFPx/erXcbntjuPvH8qqpqz3Hqx6D3/0peP3jeo/pstqivXYGSsTUtKKoPLQE5uN8w9xYKviylnPdCzoaht7NjDm8QVtsFRFGG0owI3qycRGIjPLLSj7l0Ksnhl1J0jzqqCuuyM1wjE74zGg9I4YL4KQvhTYN7joW3S80ie1fDXbaalizfdtgEn8bW/byqwe5Fpm6O3vNZr5O3sW2XWPq2rJT95Wb97H7Ksru0Tu8PxaypPeyAmm1SGZcNZFH/z+9v5A3ygeLXn7FNDb22zFdgccI8jcpb5u4lt8iAfxKSPdVJZuTcSTMKBlzCFX/wC4H8qW9z0OnxLSm/j6/YPt7Zhe8sabOzTwmSAPYaKXacWz2m6N+7lQ4sk2rzRBONZy9X9Hy/fb21VbBeYbKwHrAsB3tGEe0VtWtg1CM9/Jr5Dm2nBsZH/NMd6szO37sVZXt2i72GMG3aCg8FuKbUN4Oh7wSKq7Ki5eS0vqWInl2QMvYF8TWp3HYxvcnMGB4ri/NhWvbg7qJ+HFyXPPy+iKa2wJVwRmueY7x7zQl7ZmuY0tntG4HGepS2SB4zh8au3tYWdSDkx4H53b8hijwpbr2UPeOQIgzI5m2Br3NQJ09gXmSi5fAqt1bWGBtkwt1cOeRUkdk9CCam2La8arzjTlOceBmhflDu42bzKogP2ljIAn1vbn94VBuW6Wcn6WIxyk448Aa1rYo0wnDxI91fr12NJuraO1HFWRh0BYI5/CxoC/fFvb7ZnI3WtueJLyFHQD06ezkK4rFbuXzkuL44SR7QKh35sLXbl70eOfTYpRSzKGsWIPZBj9nx5UWNruS6I+K74cX9jVthIKt6rAq3DI5T0I51ltgtnZ79yy+k4hHEHUgcswQOGnA1fWdsFxA+XanEPouDDr4MD7KD2636ZQR+1s5rzdPo9TnHj9bLr7E+BuFp8Pn4fH7ndr2cr1U8Rpnp4VDtAzDcHz+8D+sHmcX3+lTbv20QA2aHxifeD/AFHUy9u8FSFPZMMs54GGh6qQSpI4HpNYkG5uDSl6/kxmxXit4KTztnrPZB8wD4Vp9n2/srkcLetHAdkqZ4MCZHUVlN7Wyl4yCCYOfAjssO8ET94VrPklhuNtFthKwBHT0lweGgoq3Kut0+EstXx6/csf8Sf/AOxZ/A386VN/9Mf57/gT+VKiqXwPH/63n+38DaB21e0DzBHjr7gaOoDeGZGeke0x7qmze6WYveI6uNyrCE/SPDPIZcOs1SG2OX5n20R+lOQBiIAGQGWXhrUsWk7GZoOcaRoxPI0xn8+QzP5R41mVNTWNrddGPccx7aPxSV9G+zLTarJKnEcyQixoguEISOZ7RJPId8i7XtfpLN3kLqAfZJSPbNcubcbgA0YBm6EBCpPh6SY6VV7GhNq809liuHkBYuKGPeWZvwiqsbtBY8Vby5TXzIPk82G1tD8blm8/8IHtajdn2jHusdLUfhxL/sNctbPgsIv0rLp52w/+2q75Psf0Q24gML6A82welUDn613ypt2vXxK8iU25r/Jfor+wUe0lv7CD8BuIfeKrNn/4jDxH8JGIebtc8qstkzRfP8QBPtHtoO/s2HaVuD6OY5hScXeQrk/dpa72PTStfmaPdmz47bqNTigkGMQIw94kCsfbxJiQCCYcSOI7OY+qSh71jjWr2XfdiySly9attJye4qmG7QIGZ48QKH3psyYxfQhrdwyWUgr9YSNF1bqQdMp1WkR4crhkkpLZ8FduDYxbVieIBk6kZkk9Zk1qvk5Zi2XIzck/lPiFU1V3k7WBdWZVHQBQT4RPnWmS2EUKMgoAHQCsW7tiOtzOS/Mpt7qBdxTGJR5qTJ/eXyqt3bv3ZbNy4Ll+2jSohmI0lgdP8yPu1A2x7SNoubTfaEdWVLclmQAhhkOyDhUyAcyawu9N0/8Avr9q6xJXC0jKSyofLOB3Cm4sUZTdvZIfhwwnDw3Lt29dj0jfW12NpRWtXbVxkPzLiMcLZHKZGeE6fNrN7l2YreedC5j8OEj2DzrOH5NocwzKREGQYz106jSrrY9quLtkFhgZAyrwDn0Jfhp2j+GtyQSvQ+xVhx+HjcIu0X18RctH66jwJzq73JcdgVDKsejJyxN2rSEnUBc8hkdD4Ue8Dx5FT7RV7u3F6MlWzWMIGWYRcjzmI7iIzE0iJH1f9NAW/nFpXvFcJVlF/CMmDQqXwMyYgKegYZlFoOzemGUg8QRmCCPIgg+INaD5R2A1m6TELZuiepAI8ig8SOVeZbv2ltlJXM25PZ+jxleXHLjHOTTdKktuQ+gj4uJ1yjVXEwksvqkyR9Ak5z9Unjz11MWO7tpwg4jAEQOMk8Oms1V7FtiXFx22DA/BBHvBqUCNNPd06jr4HmVjJwtaWGb73QNqXskC8uYPC4IIA6HIZ/VHAZA/IO8RtV624KvgJKnIjDcGKR3uKsdlukAE/N0PJTGLuAgGeQNWJsA3FvoB6ZFZc8saEqWU8A0osH6vLRsH5kuTLKGKWF7p8fD+PkXlKqz/ABf/ACL/AP8An/WlRnleHLyK1jAk1WXSWnrUt/aMWQ099QyeVeblyanSPdxwcd2TegaJ8Y41CtEfpUjTPTpQ41Px0/Kgmor3Qo33EDn8fHCunXw93964dfj451Ps+zM5AXxPAfHKgW5raStg+PCWPK2w82tz7AfOi91bNOx2hpjDg8/17P8A73U+Fc39swRVC6YLgJ5k4SPEwfKjPk+A+yWwcwUKnPkShHsNWQ9mK9eZNmyXhU15/ci20fqrbAHs4DHGBkV8YjxrJ7tc22uLOSsXXPKbTtigcMVk3M+grYO3ZZCZIJB+1AfwkEMPtdKyt+1hvYuTF+4C23smMusU1S7D+ldwlF+vIOUYBlopPis/yM+FM+UFlzYZrTFXUEhlMEDCQ0HgIJzHhUewXCJtmQU0nUr80zxI9UniVniKm2O/gAVswCVz5ScIPWII5ggaxObp7DJ2nZmN/biFu9sq3H9KHsRj0xMjFjpmQFcRmTETpnYbgtfolxcMizdIW7bYyhBMBxOjA4Ti5TWru7vsX9nQXMQ/RiXlBLFMDLkIJMrqANUIGlUNjdAuYb/pwbTWsiGwlTB7Yw5rHsjvmrxHKK8hePMskHGb3V9ueao2W6t24GZmkwSqTmQohZPU4Rn0HM1a0DuLajd2azdYQz27bHvZQT7aOpFVseLklJyerkD23Y/SNb5KwY+AJHtjwmsr8rfkxcubWl6wvrWWVs4EowK8DLMCQMx6mvPb1WfKHYr1+ybdm/6EnVgpJjoQQVPUGjhKhnT5pY8ikn+vBiN6brvq1tLQJQ54iDmCo1MZdqTwyjlBk2vdq29pUhRCqATnKs59GgGcQ2ZPVREZ1Y7J8n9vUYG3gpXmLMv7TBPUzR+8dhW3atWwSx9JbLM0F2w3EYsYAHADLISK6cklsz1Pxd1BO/yv9XZX7RalTV5uS02AHQEs0kayxgAcAABwznvNU+13lVLh4pkeOZUEDvOJfMUeN6vhVUtlUhyGJBYpaAzUAR2pGEk9YIgmeHmxHUuUoJI58oN4gkbOsnUueBwlTgnSRiUnvA4mMXvWxm32cX4WA9zPWy3rsQWygGqsSY0JZXLnuLGfKs7tFuRckf8AxXPdWKf/ACJj+hahH2TP/Ju7hvXLZMAlWU9WBlTzBwk98861qXPpZH2Gsff2YgFxkWZQOYCYjiH3mArXbFdF60rx6whhyYZMPMGKozb+0vWxf1CV6iz2e6MPdTNm282yAx7GmImSrLGvMFCjE82PhUela0wU6H1T+XsPkRykm1a9MtxQeAcdMMhzAzOTJlyTLOKUn2Ip4oreXBpv08fSXzFKsD/hV76J87ddo9wfwGH/ADX7fcvSaU10CkSK8saNXU+B/L8q6daaWzGR4jSOvHuNOz+Pj8604t9n3YhAYsWmCOAz9vHpVkqACAIA0AoHc7k2yCfVMeBz981YFOYPjVMUq2PJzSlqqTA96bN6S2QPWBDL3iRHipKzwxTVT8kb8K9k622JA0OFjnrxD4p5YgK0UVWbbu1Wf0qv6K4ueMRBEfPByIgdMh0o09qCx5FoeOXHb8zm0AeldTAxLb/EWuBfGVVR39aov0bHcJ+ao7R6SCR3kqB3F+VHb2sM9pVdv1jsHBUFY9H2rIgkkSygxOrnup2+Yt2yo1c5/n4fzon7KKcDqorl+rM/eYsBcXJsbBe4dmCOIMT40UJKtK4ccjPMYkbDPUGMPgogTQ+7lx2rRAJMIcgcsSo86ZSVw9A5PCrrem0C3YgK2KDAKsMTmchIzJJY5cJ4Vzf9pTkzJSUFzZF8lXF1XU4gVIjtHNLqhsLcQVMrkQeymdG7J8ktitns7OsTOFmd0kaHCzFZ8KpNy47N0yp7JgqvaLW3W2Cw+lDqTpJ9GwAk1tdnhwHUhlOYIIII5gjWiUn/AGsh6iTjK4PZ+TC1NNa6AQvEiQOggH3jzpyikRRnnnQa41JGB04ZePKu1xgNcB10qo2/NlJ0XEfugGT34ih7gKvnA41m9vY3GMerzGrRoAeU8egjmq5Iq6feRXbMLTMTeu20UXBcIZ1XEyhQqmfWCuhz4+jTUE1dbTcUhXUhkGIEgggCVc5jKMNs+YqrtG7s7LgzF1XYjLCWtsJByxAHGAIMDCMjpRv6QtyGwrJAhgIaNRmM46aVunhj8jc57cIJ3s2QXxPtUA98t+A1n94ELauEmMQwz9rsj2sKtH2dzAUrHMyG0jPIg5AZ5d3N9prKZkE3Uzhu0wyMFFHrE5wQJ1HAgAoe0Himsa8zI782b0eGciVyU/NBMLPUmSfDlJM+SRzdDoYceII9y+01zbd17TtNw3XTApOSk9qNBkNBHPPM5DKDvk/Yi+QOCj2lh+Rpt0qPSnkTwNXb+pPvTZMdkTkQxAPEYhiB8Cs+NRfIty20TGlpw31Wx2svYfKrjfKhbQ+sw/hc1B8h93YRevEZ3bjAfZR3g+LM3eAtbGO5BLMvw0r77L1+pef4RY/5SeVdo6lTKPH1y82ZfdewSQ76aqDx693x3wbx2b0b5DstMe8jw/MVZXLzHjUG0IWWCeR7uteM80eEmerDJLXqf6FS/uj+vsmuzXdo2W6ozAg5A5xy8O6ubIrOYEEnlw7+Vaty21V2Xe4UyJOhPu/qfZV2+hqv2e1gUKOA8+ftqWTV2OWiNHi5vbm5Al7bkUwZnqpUebwPbUDbQDmVNw5QiBikjMEuQA0ajQDvANWMVxhWJ0amirtW2a7L6iTloukL3wytyyGsSa35UtDodFgjxhSPYGPhV16UKbs+sXWABLMDbXDAGvqsPuNwE1FtFnF22AOH1U1BYHs4jpIbQDIHOSYg5cDsedY5qbMz8nd338JRbfZWSCxjI5pwJxERkRoJyGHGdd2faiMAsuBkZbDhkGQeyzNIyiFGgyyUjU7LshtoqIwkeszKSWY5sxgjMmSe+u3DdGYNtukMs+MtHlWyhFvUxGWayZHOlb/MrNzbttx+tCNdIEgqQVUTAAcBoktnA1ok7vW2WNom0z8ZZrZbhiQmJPMQTpOlLZt727rG2yslwT2HgNxzUqSDoc1J8Ke1zVHzU6HjHIxxHAj3ia21HYxKS2/YHtb8wkreQqVMMV7QB5xqVIIIiTBEgaVNd3srQLTBvpMDODpH0zyOkSeANbtdlWZTcUMT+rLFQZIDOp07PZDzHEgcKksWQghZzM5kngBqSToAPCkZc+nZclHhQdOvsPNpB6gw8ZBIYnUkkZkk6mc5M1Lsm+0GJLrdtTAgdpwZggDU5GYyyByByE2naQikkxHE5Ada863tvVztWKzBeyFYJoc2IdWnQspAw8ARMHId0cZ5JPyDeKLjcj067de963ZT6IzJ+0dPujLXNhTTbgxz+Jqu/wDUmz4ZDMcpj0dwHullCg95FUe175e+0AYU5Tr3nj3DL7WRpri+4meaONfQ0N3b1uXBg9VRgU8xxPiQPACg9k2C4rejtviGoxD9mhy1GoWDAIJOQnImht3yWVQJYmAOZifAcSeABNa/Ydm9GsTJObNzP5AcB+cklFN7kuDJNNyTIFtYYRcyACzHMIOGXFjnHcSeAL1wICRlzYnM955dNB00qO1sjsJdyuIliq5a6Sw7UgQMiMgO+qzeG6rROd24Dz9Ncn99iK1lcFGTqTJ9r3iCpC8cp08udM3Ps+Asx1b2CIgeHtk8aCs7tRTIu4joCzYm7pxTVlsVhsWFnjiAo9ZRxDMTI4EQCPEEr3TKZuEYaYsh3/dLFURSSgLkcpGFSY4BZJ+0Ik5UZ8kNtVrK2wxJUQCdTGs/WB4ciKNt2lTQROZ1JJHEnUnPU55UOu5LRcugNtiQWKHCGOeZGmL6whutHCduiaeSEsWh7eT+5dTSoP8AQn/51z9z/wAaVPIqXn8ytakRXSucURs9mMzrXz8Mbk6R6DkkiSwsKPjWnJ8fl7K6KbME+B/L8hXopUqJ2OmlNQm/3RUi3Ac62zEPNMuaE8s/LOnEnlQl842wn1RBbqeCnpxI4yBmCRWnXW7B3dmJuIoEKVBJKkTnwBkiByglhnnUG2bVKFQsEAYV5kHsAEaiQB7xT7D5sJzDv7XYj2GfGm32VP1jfNBC5Ce1AMdT2VHjzpPivVVDfCTpjNre4wJuX2RQNFbAF6swgk+McM9TVrvq7bMW3Nxf80Hxg/tJ+1lUW0XGuHE/D1V4L3cz9bviAYoVqOM5Xbf2K4wVU0E7z3gb6FGtBTIIcXCWXMEkdgEExz5HUCpdl33dUQ6i5GjThbpORDd+XjQFKj1vgLRGqoK2neV1yDiwRGSwRIBBMkT845aaa61Nsu9nXK52hzAAbvyyPcAPHSqPeNm4wX0VzAQwJykMOIIooNlP96yUU1boLw1Rp7qLdTgQcwfaCORB8QRzrA7y3Guz3lZRkZAP0gc2DfWGs8YngY1O4r8ObfBgWHQggHzxD8PWiN97GLiFTlOYI1BGhHx040vDleCdXsxE4WtJlYFO2dpbCoJPIAmOpjQdaagtvKi76K4OyyuuNQeMQVJB4EnMEZVdbk+T6l8BZmUENc0CDkoA0LcZJ7OLQ4a9CSTPIeK5aXyX3yW2EqnpXEM/qjLJOeXFsj3BetW73ToonqTCjx4+APhUtKsKEkiD9HJ9dieg7K+QMnuJI6VLatKvqqF7gB7q6yzxI7qibZ/rNWB88smYTkcx1zqL9Dt6YAucjD2YOk5ceHcSKYLDDRvfU1ot87zFcY1XDImV017ajiB2x3qMm+7HRaJ2K6GgqQQQCCMwQcwZ5RTkNDbuGERwD3B/3HAHhkPCgaSaaBe6ZZUqVKniCitX46zr/cUXbeRkPP4NBE1JYfOOfwK8TDladPg9CcU1ZObnXyHx7qZegxmeXLrwjlTM+VcYez4Psmq7J7YsIGgqe2cjPxlURFJTXIGwlbgNVwvlgZPznjT1QxC8OIAOfOpbt0orMNVDEd8dkeOQ8ap790qoReAAnoBFHEDLKokO8NrNgs57cx2AArkgQCCTBnsjhoInQrec4ltk4vRgSebkZnpkcv8AqGgrO7DcdXyKpds4mJklvSIQg55ZmdAQM5yI3k0Xbv2h/ppQ5Ipbrku6RuUVfrgrNj2/0oc4SuF2TPU4Yz6a6U80nfOpdk2c3HwjIDNm5D/yOg8TnEHHXK2RbKkRKCTCgseSgtHfAyqRtmuDW2/grH3CtFb2Udm3bGcyoxFRlqWI9YZ5zMkiZ1qe6jI2FxBiRBkHODHHLKcvnCg1OtSWwl5VdGOuOAYJAPI5HyOdNsjEYTtHkufnGnjWyZZyOYroofH+ASy12K3dO7yks/rERGuEaxPEmBPDIAcyVtgyoihdueBSZScnbATbZjN4WiNo7M4mXIDIkghdeHrKJ4CvRNybvFiylsRMSxiMTHNj58OAAHCsdYUekN4gn0YKrGZl8JYAfSgIB9oitFsqX3TFdYqDnhDE+GI696gd/GvVjJ6UBm6dXrvkvHYASTAGpOQFB3N7WRo+L7AL+1ZA8TQT2EGbAGOLdoj7zSfbXdh2L0hxEQvDmf6VtgLFBK5MIt7xe4f1dkxxLsFHhhDT3SKKVLnF1HchnzLH3VOqgCAIArtEJlJdlQP6Nxpcn7Sg/wAOGol2tx69vxUye8g+4FqMqO8vGsZia7it7UrLKmfeDyPI9Kh3doeYe57bjOP3WHnQV2zG0K4JhrbKwnI4XQplz7b5/wA6ItthuD6NwEfeUSPNcUn/AC1pc+DXFJbFz6QUqHmlXeKxGgrfRkcPZUlm2Zk5d9ExXQKhj06Tuyl5NhjoDQ7CcqJuNkaGmnsUzqmQKSU5bZjzy9opmLOhbrkymQb7fCgA+cyk84WXB/EqjxrP7TdIE8SVH4nVfZPsq139eGJFnRST4lQPcapdr0HRkPgtxWPsFOhTEZb1pMJ2ayFa1xi4mZMmWcSRyknQQOlWm9t2G4cSEBogg6HlmBkfA1VkmJAlhBH2lMr+8BWkW6GAZTKsAQeYIkHyNLyt7Mo6Wbr/AGZu3uJpl3A+zmfAsAB5GrbZ7CoMKiB8ZknMnqaIamVLKblyXOTlyK3cwujcAwB7m7PkCQfu1Zb5tSgbipB8CcLDyM94FVjqCCDocj3HWmlJ1LNx7TMwkaGCSJp2LOowcWhMsdyUkPpUqhu7QF76mGkjtFUm8tqnKal2naiag3LZW9tGA5i2BccePYU95zjiFM5Gn4cWqQxLSnJ9i53DusC2rOuZ7UHhikieuEgRwqw2x+HKn7Zti2xmczoOc5D440LZ2d7mb9hTnHz2/wDAd+f2TXoV2RLqcnrmD27PpnjP0a68MR5fGneQRdCm21CgKBAHDlTq1Khc56mKlSrtaAKm3dKdUW0tA7uHPkPHSsbOQLtSZ2z9Yjw9G594HlSvg47QH0yT9kW3B/eKjxqbaRnaHNz/AKVyo8E3cXBFwDveGf2C17aCXBqd0F12uUqSccilFcBpKCf6Vhw6mQOldwdPOkPj48q444GzOR+PgVHtCkxln4mpW1HiPz/Kk9wKCTkACSToAMyayUdSo1OmZTe7H00fVXzm4ar9vnCYGcHIanpRG+Lp9PLZEsJX6INtCF74bPrNQX2o4Q8NUR553kCQ+WIZqcweBBzBovYt5Yey04c4OpWc46qT4jqPVB2S6FtKSYAEfh7J91CvettwuJ1A/wBucfhBopRT2MxycJWjVhwRIIIOhBkH+dItWULYAosM/pHYAZnMsQBiBGGdBplV3c2e/bjGyOIHaCEAnwbLypH4Ob3huXrq8SVydBpuimNf5UA125wRD33GHutmu2musCfR5CZYFiMtc2RQYg6E0D6POuY/uvuMj1OGXEvmEtcJoO+wGvHQcT3DU+FEWkJGJw+HUFRbwkfcdyR1EV3aNmUqwtDMiMWZnLKWOZ8TT8PQSe8mKzddHHwr+RFsWxC4od5hswumR0LRrPLTnPArcG70tvtDWVClygY6jEoZpidYuLlkPzHtbwBQcMh356COfCKu9gtejt9r1jLHvPDwECelD0+rU+yKcsmo15jrOyJbOIyzn5zZt1jgB3RUoctkMhUYUsaIVYqsmb8+ToEUqVKtAFXaVKsOOihb/adV64j93TxxQfumpnvDhUOwLMufnadFHqj3t0LkULO43HbewXAx0UsxjMwLbcOJzpllSEzHaMs32iZIE6gHIdAKZvewHaxM5XC0DQlbVwrPMBobvUUWKXkfY2KpIbjHwaVRfo/WlS7CqJXXt5M2Vvsj6RHaPcCMvvA93GhHRSZcBvtdryxTHhQlzagMhUbX5rh0Y1wFmzbmQiA8wqyPGJoi3tTp6jE9HZmB6SZK+GQ5HSq5H510XIrrZrRptn2pbi4hIg5g6qRBIPhyyMyMqV4hj9VILdSM0Tzhj0A+lWeTaiCXt6gQw1xLnlEiSJJXPWRIDGi/lFvRbWyF7TY5XEjal2bRj4mTkIjQRTMcbdgRxNyUV3KDed7HcLTMs8nqrm3/ALK44mq/din0VuTJwqZ54hiJ82NWCnKtls2jzc6rLJfFlXsG1hLjK57Fxz4MWhT0nIeI5VctsxXRcY6QG7s4HtFZy8QvaYSFIYiJkA4iI4yARHWtPbuwRPbAhtf2iSOPExrwOU5NTJrhhRx6oavJ7km791i4MdxCo+YCQSfr5EiBwzzieRN5Y3iD+pu5XDIBgBWEGI66dnWSYyGQX+LIcziHepJ/dkVVbz3nbdTkSwiARAIMzmc8uRGc1Piy5Vk2WxZLFhlDS2i1CSJ+Mta5d2x7dp0n9Wcz9LPVBw7RjxJ55Z7dG8rlvEpOIAHCh0AMQV4wD80k5EQVzg3btpF0gJOAZ5iCW69B5EkngDXpTzQ0tsixdDkWRaX7L7ry+/1FunbLgVrNx5Fwk5jmSWUcuIB4rlqMR2aKttOSgSfzJ51hb9qFk6e6M+HGtnsWzOEQ7S4Zlg4RksjQt9Nx4CRIEgGkYs+qO5V1fSrWpRez7fYZsW6UDG6bcOxxBZMJPGNA5zJIGRJHMk02udDbRve2MgS32R+ZgUBe3pcb1QE6+s3tyHkaFyQ2GHJL+S7JA6UNc3haHzwTyHaPsmKoyhf1iW7yT7NB4URb2XnQ6h34eK95hx3oOCk98Cm/pznRQPM1EtsCn11s7RBcI6b9w/O8gKQLHUk1ym3H4DU+zr8e6Yw6l2JSMXZ5+t3aEeOnnyqyQQKF2KxAk0UWiuSJsjt0V++NpCNs5OjXsE9WtXAvm2EeNGLQW9rK3QtkthZw5U8VYDssOoYqR1FTbDf9IisRBYAlfonRl7wwI8KCa7m17KCYpUp60qDYDcwCaVIjUJjp+KuorC8VOLZUIr0sdZRwQlyGB4ce6oN7LhUgn9WxLryDZs47mGJu/FzFNc0/0Pp7Jtkdk5FvowZEc2BjoOM6E47MbinpkpAG6TNm2TrgWe/CJqQ3YmrjY91WkAUKSM9WY6mTlMceVSXN02j80g9GbLwmPZWucW2zzsvT6puSfLMsy1DuK41geiZpQN2SdbQ+YJ428JgjhLEdLXeO67lkF5x2+JiHQc2AyZfrCI4iJNU+3LkTwZSPIFl9hbyFUY3a09mLxqeF6ez/AEZqFbwIy7iNR8fnRNu7NB7zIQYx6qQLnJV4N93iPo58FBYppDQvqcDwzrs+Ava9lD9GGjDUfz7jUey7Gz3WVFCqO1idxCrznIt5ZaGMiXWtp4N5/wA6W2XGQB1JlDOXrRoSOsE9+mhNdSezC6fqZYtlwXCfJtiVb0qsAQxHo2XFGYE4zAmOcgRxru8d3bU7knCycFRs/vYgJ7h7eBG6d6PePoyyg4cQcCca6dkaAiVk5jtCBnlcqscSe8k01RjVIqXU5E1LZ+v9GTFlgYZSDyII/uKKs7NzrROARDAEUFe2I6pmOXHw/rQuA/8AF6udgNVjSnBTTlAMwdMjwI7xqKcAR1rqOchotmu+jqVSvGRUwtL8GtoW5tAjADhUmzbN85vj+nSiBaHKn11AOfkdqp3+FISWAIOQ58THlVozQKrL2xrduAsT2RBg5GTMaaj/AHVklaoPA1Gep9irubWfT23btYFIImJkrh/gbzq03XtKl7igEZi4Bwi4TMHj21uH7woQ7ARtU4QUCjWCCrTAM6kMG/FVpetBQrqAuAmYAHZYAN5EK33KXpdMdnnjpJeQVSpuE9fZ/Ku0skPN6e/ClSoikdb41xdaVKuNO36P3J+xXvf/AFGrlKi7M5+6WNvhXX1pUqWCggaDvHvrzkf8P+P3tSpVR0/1X1F5Pc/2vqbJvUud9z3mqrd/7K39hP4RSpUL4O/+l7kfzZO2lFN+y+7+VKlWHkol+TPrbL3n/Qu1o9//ALMfaH8LUqVNXcuxdixauprSpUR3YrN4f8Qn/Sf+JKdSpUL5KI+6hVJstKlWI58BNcpUqIUR3+FDbF6794/00pUqzuMXusefXbw91S3f2b/Zb+E0qVYgJdiKlSpVEcf/2Q==";

// Anime-themed products with cute anime girl images
const animeProducts = [
  // T-shirts
  {
    title: "Anime Rock Star T-Shirt",
    description:
      "Stylish T-shirt featuring a cute anime girl with electric guitar",
    longDescription:
      "This premium quality T-shirt showcases an anime girl rocking an electric guitar with a stunning purple backdrop. Perfect for anime enthusiasts who love rock music. Made from 100% cotton for maximum comfort.",
    price: 299,
    currency: "NOK",
    imageUrl: COMMON_PRODUCT_IMAGE,
    additionalImages: [COMMON_PRODUCT_IMAGE, COMMON_PRODUCT_IMAGE],
    category: "tskjorte",
    stock: 25,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "White", "Purple"],
    featured: true,
    rating: 4.7,
    numReviews: 23,
  },
  {
    title: "Sakura Metal Concert T-Shirt",
    description: "Black T-shirt with anime girl in cherry blossom design",
    longDescription:
      "Rock out with this limited edition black T-shirt featuring an anime girl surrounded by cherry blossoms with a metal-inspired design. The contrast between soft cherry blossoms and hard rock aesthetics makes this shirt truly unique.",
    price: 349,
    discountPrice: 299,
    currency: "NOK",
    imageUrl: COMMON_PRODUCT_IMAGE,
    additionalImages: [COMMON_PRODUCT_IMAGE],
    category: "tskjorte",
    stock: 15,
    sizes: ["S", "M", "L"],
    colors: ["Black", "Blue"],
    featured: false,
    rating: 4.5,
    numReviews: 12,
  },
  {
    title: "Neon Anime Drummer T-Shirt",
    description: "Glow-in-dark T-shirt with anime drummer girl",
    longDescription:
      "Stand out from the crowd with this eye-catching T-shirt featuring an anime girl drummer with neon accents that actually glow in the dark! The vibrant design captures the energy and excitement of a live rock performance.",
    price: 399,
    currency: "NOK",
    imageUrl: COMMON_PRODUCT_IMAGE,
    additionalImages: [COMMON_PRODUCT_IMAGE],
    category: "tskjorte",
    stock: 8,
    sizes: ["S", "M", "XL"],
    colors: ["Black", "Purple"],
    featured: true,
    rating: 5.0,
    numReviews: 7,
  },
  {
    title: "Anime Rock Festival T-Shirt",
    description: "Limited edition anime girl rock festival commemorative tee",
    longDescription:
      "Celebrate your love for anime and rock music with this commemorative T-shirt featuring a cute anime girl at a rock festival. The detailed artwork captures the excitement and energy of live music events.",
    price: 329,
    currency: "NOK",
    imageUrl: COMMON_PRODUCT_IMAGE,
    additionalImages: [],
    category: "tskjorte",
    stock: 12,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Red", "White"],
    featured: false,
    rating: 4.2,
    numReviews: 9,
  },
  {
    title: "Punk Anime Bassist T-Shirt",
    description: "Edgy T-shirt with punk anime girl bass player",
    longDescription:
      "This edgy T-shirt features a punk anime girl bass player with an attitude. The high-quality print ensures the vibrant colors won't fade even after multiple washes. Perfect for showing off your alternative style.",
    price: 349,
    currency: "NOK",
    imageUrl: COMMON_PRODUCT_IMAGE,
    additionalImages: [COMMON_PRODUCT_IMAGE],
    category: "tskjorte",
    stock: 20,
    sizes: ["S", "L", "XL"],
    colors: ["Black", "Gray"],
    featured: true,
    rating: 4.8,
    numReviews: 14,
  },

  // Hoodies/Gensere
  {
    title: "Anime Guitar Soloist Hoodie",
    description: "Cozy hoodie with anime girl performing a guitar solo",
    longDescription:
      "Stay warm and stylish with this premium hoodie featuring an anime girl performing an epic guitar solo. The inner fleece lining provides extra warmth for those cool evening concerts, while the adjustable hood ensures a perfect fit.",
    price: 599,
    discountPrice: 499,
    currency: "NOK",
    imageUrl: COMMON_PRODUCT_IMAGE,
    additionalImages: [COMMON_PRODUCT_IMAGE],
    category: "genser",
    stock: 15,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Purple", "Blue"],
    featured: true,
    rating: 4.9,
    numReviews: 31,
  },
  {
    title: "Kawaii Rock Star Sweater",
    description: "Adorable anime girl rock star sweater with glitter details",
    longDescription:
      "This absolutely adorable sweater features a kawaii anime girl rock star with subtle glitter details that catch the light. Made from a soft cotton blend that's both comfortable and durable, perfect for everyday wear or concerts.",
    price: 549,
    currency: "NOK",
    imageUrl: COMMON_PRODUCT_IMAGE,
    additionalImages: [COMMON_PRODUCT_IMAGE],
    category: "genser",
    stock: 22,
    sizes: ["S", "M", "L"],
    colors: ["Pink", "Black", "White"],
    featured: false,
    rating: 4.6,
    numReviews: 17,
  },
  {
    title: "Anisong Concert Hoodie",
    description: "Premium hoodie featuring anime girl vocalist design",
    longDescription:
      "Celebrate your love for anime music with this premium hoodie featuring a talented anime girl vocalist. The high-quality embroidery and print will maintain their vibrant appearance wash after wash. The kangaroo pocket keeps your hands warm.",
    price: 649,
    currency: "NOK",
    imageUrl: COMMON_PRODUCT_IMAGE,
    additionalImages: [COMMON_PRODUCT_IMAGE, COMMON_PRODUCT_IMAGE],
    category: "genser",
    stock: 10,
    sizes: ["M", "L", "XL"],
    colors: ["Black", "Navy"],
    featured: true,
    rating: 4.8,
    numReviews: 26,
  },
  {
    title: "Anime DJ Pullover",
    description: "Stylish pullover with anime girl DJ print",
    longDescription:
      "This trendy pullover features a cool anime girl DJ design that showcases your love for music and anime in one stylish package. The comfortable fit and durable fabric make it perfect for everyday wear or heading to your next concert.",
    price: 499,
    discountPrice: 429,
    currency: "NOK",
    imageUrl: COMMON_PRODUCT_IMAGE,
    additionalImages: [COMMON_PRODUCT_IMAGE],
    category: "genser",
    stock: 18,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Gray", "Blue"],
    featured: false,
    rating: 4.4,
    numReviews: 12,
  },
  {
    title: "Electric Guitar Anime Zip Hoodie",
    description: "Zip-up hoodie with anime girl electric guitarist",
    longDescription:
      "This versatile zip-up hoodie features a stunning anime girl electric guitarist design on the back. The convenient front zipper makes it easy to put on and take off, while the adjustable hood and ribbed cuffs provide extra warmth.",
    price: 599,
    currency: "NOK",
    imageUrl: COMMON_PRODUCT_IMAGE,
    additionalImages: [COMMON_PRODUCT_IMAGE],
    category: "genser",
    stock: 14,
    sizes: ["S", "M", "L"],
    colors: ["Black", "Purple"],
    featured: true,
    rating: 4.7,
    numReviews: 19,
  },

  // Accessory items now using valid categories (tskjorte/genser)
  {
    title: "Anime Rocker Backpack T-Shirt",
    description: "Stylish T-shirt with anime girl rock band backpack design",
    longDescription:
      "This unique T-shirt features an anime girl carrying a rock-themed backpack. The vibrant print showcases amazing detail and the shirt is made from premium cotton for comfort and durability.",
    price: 299,
    currency: "NOK",
    imageUrl: COMMON_PRODUCT_IMAGE,
    additionalImages: [COMMON_PRODUCT_IMAGE],
    category: "tskjorte",
    stock: 15,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Purple"],
    featured: true,
    rating: 4.8,
    numReviews: 14,
  },
  {
    title: "Anime Guitarist Beanie T-Shirt",
    description: "T-shirt featuring anime girl wearing guitarist beanie",
    longDescription:
      "This cool T-shirt shows an anime girl wearing a cozy beanie with a guitar motif. Perfect for rock music enthusiasts who want to show their style. Made from high-quality cotton that stays comfortable all day.",
    price: 249,
    currency: "NOK",
    imageUrl: COMMON_PRODUCT_IMAGE,
    additionalImages: [],
    category: "tskjorte",
    stock: 30,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Purple", "Red"],
    featured: false,
    rating: 4.6,
    numReviews: 9,
  },
  {
    title: "Anime Band Pins Hoodie",
    description: "Hoodie with anime girl rock band pin designs",
    longDescription:
      "This premium hoodie features designs inspired by collectible anime girl rock band pins. Each character represents a different band role in amazing detail. The soft inner lining keeps you warm while the sturdy construction ensures it will last for years.",
    price: 499,
    currency: "NOK",
    imageUrl: COMMON_PRODUCT_IMAGE,
    additionalImages: [COMMON_PRODUCT_IMAGE],
    category: "genser",
    stock: 25,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Purple"],
    featured: true,
    rating: 5.0,
    numReviews: 11,
  },
];

// Function to add anime products to the database
async function addAnimeProducts() {
  try {
    // Add new anime products without clearing existing ones
    const createdProducts = await Product.insertMany(animeProducts);

    console.log(`Added ${createdProducts.length} anime-themed products:`);
    createdProducts.forEach((product, index) => {
      console.log(
        `${index + 1}. ${product.title} (${product.category}) - ${product._id}`
      );
    });

    console.log("\nAnime products seeded successfully!");
  } catch (error) {
    console.error("Error seeding anime products:", error);
  } finally {
    // Close database connection
    mongoose.disconnect();
    console.log("Database connection closed");
  }
}

// Run the seed function
addAnimeProducts();
