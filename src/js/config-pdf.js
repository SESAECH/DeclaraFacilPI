
$("#btnTerminarDeclaracion").on('click',function() {
    if ($("input[name='nameContralor']").val().length<3){ mensajeSwal("Aviso","Ingrese el nombre del Contralor Interno.","error");}
    else{ 
        jsonResult.captura.contralor=$("input[name='nameContralor']").val();
        generarPDF();
    }    
});

var base64Img ='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAAEHCAYAAADrkQlLAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAphaVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzE0OCA3OS4xNjQwMzYsIDIwMTkvMDgvMTMtMDE6MDY6NTcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSIgeG1wOkNyZWF0ZURhdGU9IjIwMjEtMDMtMTdUMTM6MDU6MTItMDY6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMjEtMDQtMTZUMDk6NDY6MzQtMDU6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDIxLTA0LTE2VDA5OjQ2OjM0LTA1OjAwIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpiOTc5ZGUyYS1mNzRiLWRhNGQtODk2NC1iMGRhMjdjYTA4MTkiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDpiMGQzMTA1My05YTdhLTU5NDctODE4Yy0yYzFmYmIzOGJiMDAiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpCNTdGMEVCOTQxODdFQjExQjE4QUUyMUI4RkEwODVDQiI+IDxwaG90b3Nob3A6VGV4dExheWVycz4gPHJkZjpCYWc+IDxyZGY6bGkgcGhvdG9zaG9wOkxheWVyTmFtZT0iREVDTEFSQUbDgUNJTCBQSSIgcGhvdG9zaG9wOkxheWVyVGV4dD0iREVDTEFSQUbDgUNJTCBQSSIvPiA8cmRmOmxpIHBob3Rvc2hvcDpMYXllck5hbWU9InBvcnRhYmxlIiBwaG90b3Nob3A6TGF5ZXJUZXh0PSJwb3J0YWJsZSIvPiA8cmRmOmxpIHBob3Rvc2hvcDpMYXllck5hbWU9IlAuSS4iIHBob3Rvc2hvcDpMYXllclRleHQ9IlAuSS4iLz4gPC9yZGY6QmFnPiA8L3Bob3Rvc2hvcDpUZXh0TGF5ZXJzPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOkI1N0YwRUI5NDE4N0VCMTFCMThBRTIxQjhGQTA4NUNCIiBzdEV2dDp3aGVuPSIyMDIxLTAzLTE3VDEzOjA1OjEyLTA2OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6Njc1OTdGQkQ1Mzg3RUIxMUIxOEFFMjFCOEZBMDg1Q0IiIHN0RXZ0OndoZW49IjIwMjEtMDMtMTdUMTM6MzU6NDctMDY6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDUzYgKFdpbmRvd3MpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDozZWQxMTllNS0xNjkxLWUyNDItOWRlNy1hNzYwOTBhY2UwNzAiIHN0RXZ0OndoZW49IjIwMjEtMDQtMTZUMDk6NDY6MzQtMDU6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyMS4wIChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY29udmVydGVkIiBzdEV2dDpwYXJhbWV0ZXJzPSJmcm9tIGFwcGxpY2F0aW9uL3ZuZC5hZG9iZS5waG90b3Nob3AgdG8gaW1hZ2UvcG5nIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJkZXJpdmVkIiBzdEV2dDpwYXJhbWV0ZXJzPSJjb252ZXJ0ZWQgZnJvbSBhcHBsaWNhdGlvbi92bmQuYWRvYmUucGhvdG9zaG9wIHRvIGltYWdlL3BuZyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6Yjk3OWRlMmEtZjc0Yi1kYTRkLTg5NjQtYjBkYTI3Y2EwODE5IiBzdEV2dDp3aGVuPSIyMDIxLTA0LTE2VDA5OjQ2OjM0LTA1OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjEuMCAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjNlZDExOWU1LTE2OTEtZTI0Mi05ZGU3LWE3NjA5MGFjZTA3MCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpCNTdGMEVCOTQxODdFQjExQjE4QUUyMUI4RkEwODVDQiIgc3RSZWY6b3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOkI1N0YwRUI5NDE4N0VCMTFCMThBRTIxQjhGQTA4NUNCIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+OBMi6wAASm5JREFUeF7tnQdgFEUXx196bySB0EEF6b0pVTrSkSagIgoKCMiHgAKKgqhIkyYgIiACUqWIgkiTIiC99w5JSO/99pv/3Cy5XO4uuUsCSW5+uF52du9ub3f+896baqMwSCKRGMRWvEokEgNIgUgkJpACkUhMUChikIjgUAq6fZ/CHgVTVGgExUfHUnJCIqWlpYkzJHkCyzk2tjbk4ORIzm6u5FnEm3wC/KlomRJU/PkyZGtb8MvfAieQM/uO0rkDR+nyv6fp+qkLFBEawtNtyY49EGw27KGxB2OD/9j/JHkKzzwsCyEbKRoNabApGkpj/1wcXalctYr0Yv0aVK1pfarTugn5FPPj7yso5HuB3Lt8g/as3kIHN+6kW1cvkyM58RLL3tGB7OztydbOlmxspBDyG1wwbEtLTaXUZGzJlJSWSB5u3tSocytq0acjvdytrTg7/5IvBRIe+Jg2zvqRfl+yhmJjo8nFyZUcnZ3IzsFeiqGAo2Fub3JSMneBkzSJ9HL7NtR95ECq36GFOCN/ka8EcmTrbloxaRZdu3Ce3Jw9ydnVmVkIO3FUUthA1ktOTKKE2DhycHSknmPepYFTx3CvIL+QLwSy44e19MPYr1lwHUNuXh5k7+AgLYWVoUnTUEJcHMUnxVL7fr1o1JJp5OLuJo4+O56pQPau2UZzBn/CSpFEJgxPFlNIa2HtIDsmxSdQdHwEdXqzP41dOVMceTY8E4Hcv3KTPm77JgXff0ieRXzITrpREj2QLRPj4ik2IYaGffsZ9R47RBx5ujx1gUx/cwz9sWotFfHy5zVREokpFI1CMeGR5FXUl747tIFKvFBWHHk6PDWB3D5/lUY07E4aTRq5erjLGENiFqkpKRQW+ZgGfDSShsz4RKTmPU9FID9NmEErvp5Ffj7FZZwhsRhk1ZjwKCpWtiStuLGXNwznNXkukOH1utD1kxfI089HWg1JroCq4diYaPr++HbeSp+X5FmFc1J8InXzrsFbwr38i0hxSHINNBp7F/Gldxu0pd8XrxGpeUOeCCT47kPq6FaJ/WXDO7FJJLkNGhOL+ZWkmUPH0qLRU0Vq7pPrLtadC1fpzeotWLwR8EziDfXn5LHnKNGBdwrFf8/AS8BzjgwNpVb9utMnq78TqblHrgoENVVv1WhB/kWK53l3AVw2Wl9TkpMpNTmFd4pLU9JIw/452DiSvey39dTAsIKU1CRS2D87suftWugNYe/EtqfUKyIyJIxe6duFJqydK1Jyh1wTSPDdB9SnXEPyLVIsz8SBS01JSqYkdHRLTSA//wCq07oxVWpYm56rWYlKVSxPviWKibMlT5uEmDh6dOse3b1wja6dPE/nDhyjK6fOcNE4ubiwDX3r8q7gjAgJpc5D+vNuKrlFrggEGbaj64vk6VMkT9yqtNQ03qEtISWW6rVoTu0G9qJmvTqQk6uLOEOSn7l4+ATtWb2Vdv20gZKSEsnNw4MPWcgLyxIWEkyDp31Cr08YJlJyRq4IpJtXDTig5JDLLeOpKakUGxnFhOdN/T8bQT0+HCSOSAoqsCqrvphH/+3bz8eGwKrkplCQnR+HPqKZO9ZQg1dfEamWk2OBfNCgK929eD1Xa6sQW0SHR5Bv8WL0ITOXGGAjKVxEh0XSd+9NoD2btpC3h2+uWhR0TwkJC6Rtjy/wJoackCOBLJ80i9ZMW0De/r4iJWfgUhJj43ngPW7lLGo1oJs4IimsYD6BSR0H0ZWTZ8jb1y/XxrGjawpy9pbIsyLFMiwWiLbGqjkV9SuZK8rHWOawsGBq06cHTfx1vkiVWAuHf9tFn/d4n48BgduVG2DyjrrtmtKUrUtFivlYLJCOrpXJydk5V4Ly5KQkiouOoVn7fqWaLRqJVIk1MrxeV7p+8nyudE1C1g4NDabp23+mhp1ailTzsMiezXh7HCksTsgNcUDl7l6etFtzW4pDQgtPbKU+49+jkNBAnsFzAgTmW6QoTer8jkgxH7MF8vD6Hdq+YhW5erqLFMuJDo+kFxvUpNX3DudqTYakYPPON+Np2qbl9Dj0IXe9cwLaXeDpTOs7QqSYh9ku1hvlm1FsRFSOBztFhYZT4+7taPKmRSJFIsnI1eNnaUjDDuTnG5Cj4B1ZHFW/a68doZIVyovU7GHWtx5Yt4MC79zLsTgwQgxzIklxSEwB72LZyd28yjYn7ha8kyKe/jS5q/nDds2yIF08qvG+NTmJPeJjYqlivRo05+B6kSKRmObkXwdpdLveVNSvhMWuOLJ5eGgIzd7zK9Vq+bJIzZpsW5Cdy9ZTYlxCjsSBflRefj5SHBKzqNu2KY2a9eWTaWYtAcLy8vahmYPGiZTskW0Lgu4kmMTNUoEg2IoMC6PdabdzrTFIYl182vldOvX3IT6ngSWoVmTeP5v4XMHZIVs59djveykuOtpiceDC0Aj47a5VUhwSi5m6/Ufu4mNogyXAinh4etOSMdnv7Zut3Lris9nk5ukp9swH8xu16NaJmcpmIkUisYx5RzdTaESwxUE7OtSe++8YRYWEixTTZCkQfNCl06csrrmCa4VB9p//tkSkSCSWU7ZKBer0Zj9KiI0XKebBrYizN63+coFIMU2WAtk4exm5O3laXHuAKt3RP3wt9iSSnIOOrJiu1tJGRIwj2rFktdgzTZZBeg/f2iyIIIviD/iKWMxmU+gpkSJRSUhIoPv371NQUBCFh4VRDIvxkJaalka2rDBydHQkNzc38vbxIX9/fypRsiQFBASId0vWf7uEfpo4kzx8vESKeWD04XcHN1K1JvVEimFMCuTRzbs04IUmVMSvqEUWBO7ZxF/nUfM+nUSK9XLh/Hk6eeoUXTh3jq5fv04pKSlkjwWAWAHCN9xftqn3GY8FG0pJbBj3jQKnGBNJlapVqVatWtSgYUPy8rIsgxQG2tm9QO4+nhZV/PC4uG9nGrNsukgxjEmBrJoyj9Z+tZAF6B4iJfvwhVJY7LE97pJIsT4O7N9Pu3fvptNMGBCDIyYywMb+tqTAUQWTyoQCgSUlJVERZmFatmpFHV59lQKKFxdnWgcrP5tD675dbHH+xLijbTEXRYphTArkvZodKPjuI4uG0sZFxdCAT0dQv0kfiBTrIPDRI1q9ejXt37ePHJgYnJyc+KulMZwpVMEkswcdHx9PxZlAevXuTe3atxdnFG7w+1vYliR/v+Jm31+8Nzz0Ma29c5RPZWoMkwJpblPC4i8PDQ2ivxJvkSPLINbADeY2LZg/n65du0Ye7u78d+eFKIyBew43DHEMRNO7Tx/qP2CAOFp4GddqAF397yyfbdFcYiOj6f05k6jr8DdFSmaMOm+X/j3FF8y05CFjnqqqdepYhThCQ0Np9Icf0qgRIyg4OJh8fX159+qnKQ6A74Pr5uHhwbfNmzZR544d6bfNm8UZhZMuw9/g8YQlYBz8qd2HxJ5hjAoEs09g3ThLwDRAbd/uJfYKL/PmzqUB/fpRUGAg+fr55ZkrZS4IWlEDhgD+55UrqX/fvnSdWbbCSJMe7ShZk8wtqLkgdDi776jYM4xRgVw+esaixkFcaFJKAjXr2UGkFD7gRvXs0YP+OXCAV8FCGPkRCAXWhKmWRjILN2vGDHGkcFG1Xh3utZgLmiAio8PEnmGMCuTGqQuE6TvNBVOuuLt5kk+Av0gpXPywZAmN/OADHny7urrmC4uRFZgK1I9ZuH///ZdeZ7FJeESEOFI4wHhz9BQ3Fzw7BxZIYBZIYxgVSND9B7z3rrlgwfhqzRqIvcLFB8OG0Z9//MGtRkFbVxGZQRV0PyaSw4dM+94FiRrNG/IqW0uws7Pn87oZw6BAMMeqQhqLSkfMhli5YS2xVzhITEykPr16UUhICHdZCoLVMAYCeQj8y6lTeXxSGKjcqDalKJbFIeghgnkWjGFQIJiI2pYsKyEhkPLVsTZI4SA8PJx69+zJLQbcqsIABA6Xa8P69TRn9myRWnBBFa+zg6tFAoGXhPxuDIMCCXv0mGxtLBOIRpNKJSuWE3sFm7CwMHqjf39uNVDyFiYgEh8fH96g+e0334jUgkvRMiUIU9aaC2Y9QX43hkGBRIVFkK2tZW4E1ufwL1nwO9XFxcbSwDffJG9v7wIXb5iDp6cnHT58mFdZF2T8Sxfn3UfMBTVZ0aHGKy0MxyDRsRb72RCIu4U9LPMTbzFxwHIUZnEAPGeI5K9du2jjhg0iteDh5VeE16CaC34/ltYwhkGBJCcm451izzywylBBZ8i773KXqrC5VcZQ3a0ff/iBzp07J1ILFs6uLhbFIMjmGFtiDIMCgakquPU0OQNBK7qPYDyGNQGR+Pn70yfjx/O5kgsatny8kiWFsw1pUo2/z6BAOFaokJMnTtBu5mqgm4Y1gpZ3uFvDhuXO6kwFBhN53bhArJAvPv+civj68tLUWkG3mbCQEFr9yy8ixbqRAhFAHM7OzhaNTitsuHt40Kqff6bo6GiRYr3I3MBAT9djR48WmobAnKIG7Z9OnChSrBcpEMZXX33F2zus2bXSBzV4N2/e5MOFrRmrF8iRw4cpLDTUaqp0swsKC4wn+W7OHJFinVi9QBYvWqQdMyHJBBpJIyIiuPtprVi1QE6fPk2RLAMU9tbynODu7k7LfvxR7FkfVi2QX1atIjeWASTGgev58OFDunvvnkixLqxWILGxsXT54kUZe2QDdzc32rhundizLqxWINu3bSNX9uBlzVXWYHaa/fv3iz3rwmoFsmvnTtnukU1QiCBOO3H8uEixHqxSIJgo+vHjxzI4NwMUJgcOHBB71oNVCgQDhNCtRJJ90Efr2LFjYs96sEqBnDhxIt/OZZVfgZsVHxfHx+hbE1YpkIsXLkiBmAkEgjEyZ8+eFSnWgdUJBEsHREVFydorC8DSDVcvXxZ71oHVCQSzsMN6SIGYDyo10IHRmrA6gWDZM1l7ZRm4b3fv3hV71oHVCSQwMJDs5KAoi4DVjWOBujVhdTkFk8FhLiSJZUAkWKTHWrC6nIJhpHJYrWVAHNisaSiu1eUUlH4yQLccbkHiLVvRqSBidQJJTTF/oRVJOhBISmqq2Cv8WJ1ApPXIOdZ0D61OIHzdRQumqJRowfSe1jTrpNUJBLMmaqRALAYCsaaZJ61OIJjex5JJjiVacWDDbCfWgtUJBMuPYaF9iWVAINY0TNnqBFK8RAlKs2ChFQlWD9PwAsaasDqBlCtbVgrEQnDfcP+sCasTSOkyZSgtNVXGIRaAoQLPV6gg9qwDqxMIKFGypEXr2Vk7EEiVqlXFnnVglQKpWauWVbUG5wawuFisvxa7d9aEVQqkfoMGlMwetiT7wOKigsPaxtJYpUAaNmxISYmJMg4xg+SUFGrStKnYsx6sUiCgRs2a3KeWZA/0gm7ZsqXYsx6sViDtO3SgRBPL/0rSQfWup5cXlbGyKl5gtQJ5hZWGKcxtkG5W1iQlJVHnzp3FnnVhtQIBrdu04Q9fYhwUIJgJv3efPiLFurBqgbz55psUExMjrYgJUNuH4NxaZ4KxaoFgTfTadepwV0uSGRQcGH8+5L33RIr1YdUCAR+OHk1RkZHSihgA1qN+/fpUtGhRkWJ9WL1A8PAbN2lCyTIWyYBqPcaOHy9SrBOrFwiYMGkSxbBAVFqRdNDu0aVLF6tfAVgKhIF5soYMGWJV8z2ZAuM+UFgMHT5cpFgvUiCCbj16UEDx4lYfsEMYmH1y6rRpIsW6kQLRYe68eXxpBGt2tTD3bvv27alKlSoixbqRAtEBy7J9NnkyhYaGWqVIYD0xqcWo0aNFikQKRI9GL71EXbt14wt9WhOIO2A9fvzpJ5EiAVIgBnh/6FCqWq2a1Uz1D2sJq7lk6VI5sbce8m4YYdrXX1OJEiUK/VT/EAeWxJ45ezYVL15cpEpUpEBMMH/hQvLz96f4QjqbORdHcDB99c03VI1ZTElmpECyYNHixVSmTBneo7UwgTEeISEhNHvuXKpbt65IlegjBZINZn/3HTVo2JCvEV4YardQWwXBL1+5kqpa2Swl5iIFkk0+/uQTenfwYO6vF9SJ5yBuCMPV1ZV+27pVxhzZQArEDLp1704/LlvGB1kheC9I1gTVuHCpWrRoQcuWL5e1VdlE3iUzwcyMGzdvpnr16vGq0fxuTSBiVFdj/P0c5iqO/PBDcUSSHaRALGQ8c7nmzZ/PS2J0csxvM8ZDGLB0ocxqtGnblou6suw+YjZSIDmgQsWKtGr1aho6bBivCsbw3WdtUZ4Ig1m3F198kTZs2sQbPiWWIQWSC7Rr3542b9lCg4cM4ZYkMjKSj8Z7mjEKhAmRQhg1atSgn3/5haZ8+SW5W/l4jpwiBZKLvNqxI61dt46msoxZkVmX8LAwblXyQiz4PIgClQWofgav9exJ23fsoImffmp163jkFVIgeQAmx0bpvWPnTho5ahRVqlyZxykREREUFxvLA2bM6phd0ahigNCwRjk+C+JD72OI8vtFi2j12rX0er9+VrX609PAht38TE9p0+xltOyT6eTm5SlSsk9ISCDtVx6KPYku9+/fp/PnztHVq1fp1s2bfB+Z3o4F+jbYdJdXZo8Fi40qzGVLYxssQrly5eiFChX4WI1atWtLMegw653xtP/X7eTs5ipSskdaaho5ODnSusBjIiUjUiD5AAzSglVIZO5SKrMUEAqWWnZ3cyNvHx+rWnbZUvJKINLFygdg1djSpUvzWrHKzB2rVKkSPffcc1S0WDEpjmeMFIhEYoJCIZDk+CAKubqGbuwZTCdWlKd/Zuv48hJJDiiQMUjs45MU9WCfdnu4nzSpiWRr50w2do7s1YlSEkKo/qD75OhWQrzj2YIaK3T3wKI9WPrNwC3PPuy9mCfXgbleqMVyd3cXB6wbqw3SNakJFHn/by6GyPt7KT7sPAti7ZgYnLgYIAr2MzLUAKUmRtDzLZdQ0UoDREregraI69ev0+1bt3jN1KOHDykoKIgH36ilQuOhLa6PbRlqqnIAHpu6oTbLycmJ13QVCwigUqVKUdmyZak8i2MQy1gDViOQhMjr6daBbcnxwWRr76wVg60j2xyyzGRpKfHk+3x3qtB6mUjJXW7cuEGnTp7kVbZXLl+meCYQBwcHXrKrG/po4TrVLa9QHx9eIURsaDPBBsuFrRgL9qtVr041a9bkc+16eXvz9xQmCq1Aoh4e0IqBWYfowMPsimyFZWAWggkC++ZmMEWTyi1L/bfviZScgXXV9+zdS4f++YcLw5YJALVLKLmx5eeu46pwIBQMlEI/LUwn2qRJE2rWvDlfiq4wUCgEkhz/mIlhDxdE5P09lBh1K10MLENzC5ELpS1+UnLsI2oyKtNPM4vdf/1FO37/na5du8b9fYgCliIvLcLTAIKB68cXD2L3qmmzZvRqp04FerK4fC0QfAK75+zLbCgoOoiOKfd5emzIaWYZ4Cox6/DoIHN9YpgQXHjpDmGwPyzKbLhkRWHBbhrz79OSyM7Bg32egziqJSUhlKp02UHepVuJlOxx+/ZtWrtmDR0+dIicmCCcmDBgJQq6KIzBCxPRhcXF1ZXPCdanTx+yK2Ct9HklEIt8AwiCWWxKSrShuFhbio6wY0GiQtXqJtCgd+zo0paX6fB8Wzq3riHdOzaZYoKOkq2DG69Vsnf2YRnajVmL7Gc6RWG+NRNCanI0z/iwDvZOPuRfsR8Twe/k7FWeHc84py4ECEuVXQ4dPEiD33mHRgwbRmfPnKEiRYrwnrCFwWKYAr8NAT5a7PFbN2/aRJ06dqRpU6dScFCQOMt6ydKC4Ci2NCYIWIhUtiG/lCqfTM+9mMS35ysnkZs783NTbPh5SYlp7JMtK3X55ShpLMMns1iCWYjURGZoHMgz4GXyKvUK3zxLNBZna7l7ZAIFnltIdo7pXbvxfmev56lm739FimHgRv24dCnvQOjm5ib7NzFUq4LZJTGBHjpcYiRlfuaZuFiunp6UmGBDjsw6qGLAVpqJA3EpxIINotB+imWCUDQpWndJk0RKahI5uBVnrlFLIYiW5OxZTpxtmIh7f9Hl7V3JwcVXpGg/NyU+mBqPMLwW+uHDh2nBvHm8ihbCsNY1+EyBe5jKAvsoJhTUgI37+GPyYZYmP/JMBGLn6EWdX4+kVp1jKDFeFQPb+KA5y9wOhVkHbezALARzmzRMHO5F6/JYQbUQPD4xA9RaHV7gwF04XauFKuLa/c6Sa5H04PPBgwc05fPPeTsFanOkMLKGFzYQSmQktW3fnkb/73/iSP7hmcQgtizv3L3hxAI4W4qPs6PkJFsmDmTA7IkDNxbWIS0ljlITw3nsoElJYC5SEyr70lSq2fcENRmpUC32Wq7xdPIp295scQDEM04epdkXZhzuitZ1VB+rzJg+nd4dNIhPfYNZzKU4sgcKHdTgYZbJI8zydmYxyt696fe1MGNSIPZ2Ct247MSCNxiZTIZGD9Qs6QXTcYHcCvlX7EsV2qygBoNDqNH7kVS501YqUetDcvOrId6bc+CKwSrpgqrjxNAjdPbiHerWpQsdP36ctzbLOMMyIBQXFxfe+3jOrFk0asQIHqsUZgwKhIXhZK/YkjMLNKLD7CkqAo114qAOEERaajylJkUyMQQzKxHG3JlqVKrOWKrW/W9mHTRU981r9Pwri8ivQu8MMUJOQd+mn3/+WewReTPXTGExjC5ogQ+9/Td99L9xvM8SHq4lFQeSjKBhFBY4ODiYFzx79+wRRwofBgUSZ5tCV+wj6IhjEO11u0enrhM52mfMWBAH+kQVKdeRyjeby4Xw8vAkqv7aPird4FPuRuUmd+/epWXLllH//v0pICCAZ/i33nqLPyTgxWIY1Hjp4+6ioXLFbZh9k+5UbqK6Xb6+vjSbWZPJn34qjhQuDAokhTR0zy6WkmzSyM3OlgnEhhz0vRIe2ytUse0qCqj6Djl75W6nuJMnT9K3335L7dq14/X0zz//PI0aNYr+/PNP/nCwNAGm0Pzrr7/4+U7upXj8AuGmY0OpGjsq5xdGaRqT3qTEQvAs0GZ06dIl6tO7Nw/kCxMGc42PxokdgKNFTBg2dPIaLIj22BNsbHnQjXgjp6DrAzL6xx9/zGcaR/D80ksv0ZdffsmFglIKHe7g+6IxS53JA9Pc/P333+JTiFmtpryGTJc0jQ2VLRLOXyV5B9xXjK3v26cPnTxxQqQWfAwKxJ4luyn2PCy3Z57JpbvIaNpjKig5bJiPr1tLlF0wd9PatWvp3XffpfLly3NBdO3alRYtWsS7i8OFwgL/cKPwPah1wnsePXrEg+y3336bNmzYwIWycuVK8akiUNfoC8SWWxBYEknegsoPPz8/mjhhAm1Yv16kFmwMCkTDpAErorB/LH/y7exNZk308hhqibLTnePKlSu0YMEC6t69O7cCyPwQx6ZNm3gmh7sEMw2XCd20MY4CsQUmW8bCLuPGjaP9+/cz90mhCxcu0Jw5c6hTp068A6EuXqVZoJ6WMVDXKDbk6xZHLg7MccyqIk6SY1CgoRBbuWIFfceeU0HHoEAgDG/FiQlFC9wrBOr6cYiNrRPvlavPoUOH6IsvvqBmzZrxUqV69er0ySef0D///MNFAEGgFgSxBXqUYr6owMBA3hj1yiuv0IwZM7hPi/19+/bRpEmTuMuVFR7FGmgbIDO0fdpwK1LWV8YhTws1LtnPnh0aZQsyRiyINg6BJQEQhmGB2FN8+EWxR7SemVXcnFatWtGsWbPo8uXLPHaAxfD09OSulDo9JgQBsfRmgd0KVtpg8Xqkb9y4kYYOHUoVKlQQn5o1GMCk4uZbjbes66IVCOIQKZCnCZ756dOnaRJzuQoqBnOMjZ0tuWrseSwCawLXyqBAmBjgZsUEaZvp27Rpw1/hhyJ+QEmO+Z7gKiF+wMRnH3zwAe3YsYMH5rdu3aIlS5ZwkWS3jw+m8oRrNnz4cD45M66hR48e4ijcrJaZ2kPSFBaHSIE8E9CdB97ApxMnipS8QZOKXhSWVMQoLA8bf5/BHOPo4kRpzH4U4VaEncTOio4juhtExLSTAQx2wngPgEyOuABiQBzRoEED+pyZWLRgQyx4nTZtGrcw2QXjM5YuXUp9+/bltVkold544w1as2YNnyQaqyTBUqkYalFHDVbpIuHcHmbwviRPBRSWiB2/Ys8+r0iIi+eFpbkgPzjqxbK6GBSIq4c7K3UV8hKBOnByJDpxLbMVwbDYSJ1AffPmzXTnzh3e0v3HH3/QmDFjqFatWuJo1vz333/0zTffUOvWrbnY4GqNHj2adu/ezRumSpYsyYWI+IV3oGNCxHDSo0eP8vd7l2pFSmpipjgEt66kdyQP2iVPH1iSo//+Sz8wjyEviAoNZy6/JQLR8PxuDIMC8fTzYaVuGvnwQF2b0Yy6WczFin50SOwRdejQgc+okR1QY7Vz504aO3Ys1a5dm8coGCv91Vdf0RkxaElt/8Ax1HghVoGFUquGFy9ezPcbNWrEP9PO0Z3sXfzYL89YL53K3Cu4WXiVPBvwHLf+9hvtYs88twm5F8hcJfOr8hWNwvO7MQzmFt8SxZgFSSNPjXYYK49DmDAMNRja2LA4JS2JkmK0w2xNgarb1atX06BBg7iIUMOFql+4UA8fPuTtH6giNNT+AVdKrRpGzRfOX758OXe39BejRL8sQ+0hZWQc8kzBMy0iuqbcvHlTpOYOj++j0DT/2WrSNCy/FxV7mTH4iQHlSlEqi0LgmHgqjtyG4LvvBmtjEX1XD50CDVX3IjibN28eL+lhYlG9O2TIENqyZQvP5Gr7B1ph1fYPjNNAKzkWgUHLOqqG4S6dPXuWZs6cSa+++ip3tUzhiY6Leu0h2posbVWvjEOeHRAJCsEPR47Uc4MtJzE+gZJSEzJnzGygYfmuGMvvxjAoEGc3F7Jj/zTMTfEW1b34brSqn7mhdbd0QXuIboPh66+/zm8ERqFNnDiRt4tAILAQaP9ABtdv/1CrhrE0AIa/7tmzhyZMmEANGzYUn2qae/fu8RozgNGI6HavCx6Fh1MSebtgdVoZhzxL0BsYozjfY4VlbnD539PkYGPZjDiY0qlUhfJiLzNGbVJA2dJ8Kn4IRA3UuZtlIA7RtqindzmB+wRBIH5Q2z8QtKvxA1wo1EqhuzqsBdwotKG89957vFNidkDNldo6j6Ad34k2FODiXZH9H5ZCNw5Bx0Vtt5M0KZBnDgrJkMePaQmLIXPKuQNH+VSslgDPpWxV421uRgVSoW41XrJrGwzT45BTBjsu2lFy7AMW8GhnFmnfvj1vr8Ci+3CZMP3liBEjeE9cmFU07KHfVc+ePblFyQ4HDx7krfNNmzblgoMLprbOo7YLIkGru4pHQIMn16OidbNkHJJfQEG5ZfPmDA29lnB0+15ycDZfIMiLyZREL9SuKlIyY3BMOtgw4wdaPmkW+Xh60UGnRywiYRJhJW9MPNHpH4giYsSJgpSEMKrcaQv5lG3HhTVlyhTq1asXz8jmAmuDal0M68Qr+nKhWhcbSh5sMKe4dHwX3DW00KvTboJ7xz6nR6fnZJjpxNZGQzGJzjRvzyvk7pzRBZM8G/C88PywTLWlvGJTinz9ipntYvG8wnL/5vDTIiUzRovS6s0bUAomXmaf8CQOYelosLx8VxuP6KLbcRFd0qdOnZptcSB++OmnnzIMhurXr98TFwzBPFrn4bdCFIg1VOuE3sBond+1axcXiwomf9CPQ9AGUtQjhllCJvfciQ8lOQTeALC0Y+OB9TvI0dbZovgjNSmFar6ibR4whlELAprblKAAvxIUaBdPV+0jyYHpCRZkdE+ins2JEnTyH1qvnTzLUa0+x0WKcU6dOsWDcIzlgOuEcc3q1J6wEupct1C4OkUmAnccb9myJQ/osaESwBSH5tqQo3vGmU5cHZNo+eGX6FGkNxN5xrYSybMBWTA0JISWskISM9Obw5hmfenGmYvk6Gz+ZB+xEdE0fP5k6vR+f5GSGZMCGVa3MwXeuEcaJ1s+/NaJ7Cgxmehl5rLNeI8omolFBR+TEh9EjUdoXRwVZHKIQXWXIA5VCKq7BEHg/ampqVwMqiBgOVQxoGUdrejmcGLlC6RJieWdKlUc7VPo4LUKdPD68+TkkPFaJc8OPHtU9y9bvlykZA3m7GrpWIaKskLcXAuC/BYe+pjWPzhBfiWLidTMmIxWm77WgS/64q44MmlgXLc2UEeXE6eMU+FqL5AF63Gh5/k+Sn7UZKExUHcwlOou4Rjeg8ZAdGZEda86GAo1WhAIGgPhZmHsubniAJhrS9/NUttDZIt6/gL5BLWZuiNEs2LFp7PJw8nLbHEAxKueXj4mxQFM5pKW/btSQnI8F4a2ulfbYBgaRRQUzt6s927tfLja6l7VSiCmQCdD3cFQiB+w6Q6GwgWrg6E6d+7M35td0HaycOFC3qsXNwvfAbxKtTAwBDe9Z69x2yl5FqDQXDh/vtjLmvXTl5Czu3kTxakks/igRZ/OYs84JgVSrGxJ8itajC8bpjs+BNbjv6uZGwz1Rxhi8BMCabR9wCKog6EuXrzIA2pzBkPpgmlDUUvWvHlzXiEAoY0fP54OHDjAhQWXDniVggVJhD3l+1psWGCooQCvaNlxMZ8BVxsF3Lq1a0WKcX6ZMo/smDujxqvmkpgQR+0H9RJ7xjEZg4CVk+fQBqbUVC9HOuUQQnC24pnX0vVlonF9iWITxIkMNMylJcfSS0O1LdqIO1BDBRcru+M99FEnZlCDenRfUa2TGsfgpvIYiIkOtV6Yvh99vsC/iz3ZjUTfrvQb6czikB3nq9GZ+6VYTCLjkPyEwjyJSOYBbN+xQ6QYppVNWfJhnomNBQJB95LkxCTaHndJpBgny09/bfQ7FJsU88TF4nEIsxy842KmOMSWNKmxlJIYxvdR4zRw4ECzxIE4BZ0QBwwYwOMVVO0iw2NyBvioagyDqmCIQrfKF63pH330EW+RV/Eq2TyTm4X4Qw7BzZ8gw6PQW//rryIlM1N7D2cBPZbQsNB6xCdQ52FviD3TZGlBwIiG3Sn48m36zyOcz5Vlw1yT8BgWrC/WVvXqfgLm4MU0o5hJMTugW7tqIVDliy7tqPJVLYRqQhGjoHYLwT/cNQR1cNnUWi50lzfEw9Nz6N7Rz8ieBXMqNjYa5jba07e72pC7UxLbFwck+QI86/i4ONq8datISef6yQv0br225O9XnHsO5oLs/jj0Ef0RcZXcvbNeICpbAjm1+xBNaPsGPQ6wp0C7OOZk2fKW9B8/IqpcllhmEycyMFG1f8U+9PwrmfvY4KsgBHXD4CjEELrukn6VLwQB0aBLu9oGgirf0qVLi081TVzIWTqzrj45uup2aVbIwzmJvtzRnu9ZMM5GksdgbZIRo0ZRS/a8denoUomcXF2eNDCaC1yr52pWpjkHszctUbYEAnr71aXHFE+XnaN4gyFij3dfJXq7A4sTdGb8RP8nTFiNqUgB+v2jVR19pjB8VhUDNohDjR/UBkFsiCUqV67MhQBBYKw76sgt5fB8e3JwzdgVwcUhmX79rx7dDPFjLqNsMMxvoIBEzeePP/0kUojGtuxHl4+eIRcLa66Qz9D28f2x36lSg+wtXpptJ+79ucxNCUvkNVlqe4h2zl5xgoqNPSVGsgMCWATEDwi21fhBf/4rxBBYQBIjCxHYw8Sipmvu3LnUpUsXs8QBlw1DdhGLqLj51zTScVHGIfkVWIigwEC6d/cu31/1xTw6ve+IxeIAaczVKVOhQrbFAbJtQUBf7zp0wPkR2drbsQxnw1vV/2OeVLje7KNY+qBqt90sQG7K9yEIWAuUCnCXUN+txg6wEpidxFL0XTbEJnDVYJGwgduHx1Hw+R/4cFwVdFwMj3OjRQeasjgkYxAvyR8g1mzVri01KleNRrbtaXHcwWHZPJRZjwWHtlDVxnVFYtaYJZATW/dSl+5dSSnhSbYsUA9jwtj2JZEfi391pybFfL0la4+hMg0n830MoIJAMBoQ7hIaDi0BVbhqQI9uK8ZcNlggtMxjRvgyZcpQxN2ddHlHd3Jw1v1ehc+2+MX2juTMXi2975K8AxnTxtGOQpYfIjc/b8vFwUhOSqYSz5WmRadNVx/rY5ZAQMdqL9PRx9fJxdGJ98Wa8DpLe4mpXacQRvcOLHtW/bUDIsUyrl+//kQQaFTECETdGi41UMNP0K3hwo1ER0Z0b6lXrx4TTAodWeCYaYk2dFxcerAJPY5xJ3tbs26DJK/BY2L+e8Kuy6QksALMgvHmKsgfqLnaeO8kFS1dQqRmD7MFcvXyFapWozofLQhRvFKbaOrbxHv5qqDBEIvpYL0Qc/j333+fuEtHjhzhcYoqCLWGCyBdVxBoK9F12SpVqsTP0+X4slLswlIzdFx0sk+hPVdepKO3yrO/ZYNhvgHVikwQCbuvkBKfzMJay2qsVOKjY6lF3840dsUMkZJ9zBYIQNCMxj8Fq1A5Ee2bRRSi7f70hOT4IKrzxhVy8XpBpGQEGVu3hRz9sCACXXdJrfJVB0WpgsAMjbqCQCfHrLj21xsUfnsH2TmkB3n2tml0J9SXVh+vz6xJxiBe8oywZ888OY2Lg9IUJo6cVaKg1TwuKpZ2pqZXHJmDRQJBxjx37hzL0E4UEkl0dCGsBrsYnU/Csmzlm86mgGragfloIYcY1G7vaPnWdZcQXANcjhpgQwywFph4DrEL2kHwaokvGnxpOd06MILsndKH+KJ/sq2thqZsf5W3i8g45Nli42xPqQ8iKenIbe5eWTIRnC7IS6GhQTR376YsB0YZwyJ5IqOiREeGQsdFQzMuYkI53Y6LqHZFV/bff/+d76PKF8E6rBEshFrli+lEsYgOOjFitkQIBIvooOq2bdu2FokD8ClJ+RJt6SrGXwjU/dzjZMfFZwniCwc7Svz3DiUeZuJwyrk4AFyrdq/3tFgcwCKBoIsHBAIgjNPMemUagsuXRkjv24/+VBADXCdU9SLgxngPVP1iNka0eaBREe0lGD6LbvB16tQR7845zp5lefyR0WBqZzqR7SHPCCYCGxcHSnsURfFbzlFaYBS3IjmprVJJSU4hNy93+mTNXJFiGRa5WAA/AlYgNc2GyhQjWjtJbyIH9rFJcY/opaFx3O/HLCeYAkhtIYcVgkVAG8nT4uLWDhT7+AQft6LiYJdK5x+UpG1nq5OLY8ZlEyR5hB0TBitZU4OiKPn0Q1JimGWH1cglHxfV/GFhwfRnzPUcNSwCiwWCjI52CXt7B4qM1c50EhUnDgrQq7dS+/VU5DntwBRcuFoT9TRIjL7Nl4iDqxf5YC/v1YvZ6HUfBBoM45KcaM7fLWXHxbxE1Eyh+jb1XgSlXA5iwmBeCGIN3PNcuvHIzo9DH9LCA9uoerMGItVyLM6tCNQRSON3QWIX7hgaQJVxxsW8Fgcm0b5/fCqd39ySjix0oZMrK9Ctf0ZR+J0/+EXqiwPwmU48Y3iVr0UlhcQwEARqoBxZpmDWIS08jpJP3qf4zeco+cQ9UpLSyIYFsDzWyEVxICgfM296rogDWGxBsMwBxmxgbl10XBzejahfSxYY6TR9YKYTR7fiVLvfWZGSe6A7C8SntQ57KCH8GtnaMwHYOXJh2tiiVT17gkTHxV+ON6R7Ub7smep1XHxyd56ifHL7q3Kc/5CJxZ+68DRxAC8soyPDo+1CE5lAaRHxlBYSS5rHzMUAsCBwr3JJEPqEhzymPmPepyEzc29FK4sFgtomiAPd0JNTbKjei0RzP8joZuGjk1kc0mRkzp94XOg5HUHsI01KDBOCM7cKGOqLTpKW3XiFnJ3T6MjJANq5pzj7mwkEn4OPYhaPawz7KA2z+zMyXYaB69JJynDd+NPY70Bpawo8ykzXyBJ0NJ/hcT/501AaA1+H/ZQ0UlLZhzAXme9jY8eUVJaeyOI29plKiob9zaww3CZ8B34DrldseSUKgN8UERpKnYcMoA+X5O4iPRYLBKCaFo17LJfye3JkPvH+WbqkxIdQjd6Hyb1oPZGSNVhjEDVgXAwshogLxcx3ttwyQAwQBZ6QpTcdNW6ofbOx15CdvUKR4Xb0334X+muzBzk5G7gdPMni25R7ZHUJeZUHjd1nJOsew99iNy8FoQuyL7qwdxs6kEZ+P1Wk5h45Eshrr73GZyRxdnahsCiiXTOIPFz0Oi4mRVOZBp9SybpjRUpmEqPvMjEgmNYG1EmxD/mSCli9iscN3F2y7IajAEMbJOIjDBHGp5y7RXTsuoaSLhWh+9ecKTrKlpxdFMPikORbkHXRx+rdyePpzc8/FKm5S44Egql2MJsIJqDGuiFfDCRqXVev42JqIrkXq09Vu/4pUlgwHXiEC4FvD/9hv1TDBWHDBKF1l+wsFgRvc4Ig2IZGTHTFx7gVbJiZ/jwTBz7ZxkFDdRRfKm7rTBob7fIOkoIDGpBDwh/R1LU/8n5WeUWOBIIlCDD/LjouYmx6h4ZEk/oTxejNdALfoFjlQRR6cxMlRFx94iaZG0zrgzzNrQPbMHAL1uJmoHZCCS6Iq0QPw4T1EOfBvYIYsEhp8TQ3ejHVm1KZQCQFh6SEREqKT6AfL/5FpStlb7kMS8mRQABaxrEOOlaS9XEn2vF15jgEItGkJgjrYHmDEGqJkdlVQSSlaBf0gWWAIM7e1A7/heVQxcCr3sXXacdCal8xW72DYkvNk0tSio2OTyjJtyCrRoVGUPlqL9IP59M9krwkxwJ5+eWX+bgNdFwMZcI4sUibcXP2qVrUYBqbM8v0D0KEGJiFwOv1B1oBQCxqnKHb1KIKAsOEtUOFidwVBz6FESbC81IcyZ6JRA0sJfkXrDQQFvWYhn45ifpN/ECk5j05Fgg6Fc6fP58Po0WL+sJRRLWY1Us2s9eGfjCNGkUss6AKAh0i0ZUFx7gg2HmquwS02V8Vg/YV8wljKWsfJgSIAhvSdM+R4sjfoPdFdFgEFS9fhuYd3UzeRS0bjWopORYIurB37NiRT8YQx9ybt9oSDelE/G9T6AbTyPAQlxpMQxBomYdImAf3xK2CiPTdJa1l0GZ4Z8WOL12tWghYC/Uc7XkMKYgCAbJlfEwspSQl0eglX9OrQ14XR54uORYIQEyBjospqTb0Yhmin8ZqM7wK8uSTYBolP3u9+VBrFVRR3H+sPf5k07EOQBWB9lV7yZ4aZhmYICAGiMKRbIUY0gUkBVGwQHZMiI2n2MQo6j3iPRo+TzuvwbMiVwSCEX4Y3GRrZ8+H3p5fph2CCxcIAXMii0nOsmBa10IkJGvdJdU6GAumVVcIc3GpQsCG+AFoLYP2PCmGgktaahoTRhzLKwnUfehAGrFwCi94nzW5IpB33nmH983C2PAIZjlWjic+0vD4FRZDMDFcE8G0rnVQg2l8PTZ0fFSH1aKOu4iLBwU4e5OvrStzm5zJhblPuhZEWoeCDyaqTkpMovi4WPL09qa+Hw+lPuPfF0fzB7kikF9++YVPGK1OUg33CuJXxZAhmGZfpz/pAsaEYPVaPrVo69ZU5bkKtO27lbR10SoKCnpATo6u5ODsRPbM5OSHUkViObAUmP4zKUHbWNaidyfqNnKgWXNVPU1yRSCYgwpry2GxHP0MjI+HEFQLgU2ddEGdfBrvM0bow2Da88tvdGjTTjqPuXxZpOHAhGLPonc7bEx9UjT5Dzx31EBhNsNUbHj+mkTy9wugJj3aU/O+najWK+atC/MsyBWBACxHgBGDqiBUMSDzNmjQgFsHCAJbTsDs3mf3H6XLR0/TjVMX6NGte5RKKWRH9mRrY8tcN+0iLOx/+E+Sx6i5B88dLhNEwWTBNg3zKPzpuRqV6MUGNahak/pUt21TixbbfJbkmkCQ8dFxEVPw4O8WLVpwUeRkWtHsgq4HQbcfUNijYIoKDeeD9ZNZGsy5JG/BGh2w6Bja6lHEm3wC/KlomRLkU8xPnFGwyTWBYLF/dDnBGBGJpLCQawKRSAojorJVIpEYQgpEIjGBFIhEYgIpEInEBFIgEokJpEAkEhNIgUgkJpACkUhMIBsKrZzQB0Fk52BPqckpVKS4P9lhNJvkCdKCWDHHd+yjDqUrUo+AWtS6TDmKCgkXRyQq0oJYMW+Ua0rR4ZEUFRNO6+/+xzsZSjIiLYiVcuyPfXTh7gkKiwmmny8dkOIwQoGxIJjFMTo6mk9z+jS60FsD8TFx5OrhJvayDwY8Y1xOUlwC795eqmJ5caQQAoGYYvr06Yqvr69StmzZDFu5cuWUKlWqKB07dlTWrVsnzs7I//73P8Xf3z/Te/U3lukNfkZUVJQyYMAApXjx4vy88uXLK2XKlFFKlCihDBs2TJyVEZxXunRpxcfHR1m6dKlIzT7Hjh1TPD09+ed4eXkpe/fuFUcys2bNGn7t6u/Q3XCtlStXVtq0aaMsWLBAvMM48+fPf3Kf3d3d+W83xrcDxyiNyV9pRWWNbo2pqDKt70jxjsw0JG+lnd3zSlMKUBaPmSZSTXP30g3l/dod+XtaUzmlDZVXWlJptpVRFoyYLM5K5/61W0pdcuPXU4e9xkXHiCMK/wy8F9exffEakWo+ffr0UQICAjLce+TN5557jufP1q1bG8xbOE/NJz///LNIzUyWLhZG52HOKyx1gA3jzrGhJMfSB/fu3aOxY8dSu3btxDvSweg+9b0YJ6K+19CGceq6YGXbChUq0KlTp/gaJJiYDstG43sxRBfLSbObwEct6oJz8H34XkvAhNzsxvHPwOu8efPEkcyw+2fw3mBj4uLLW2Pl3pkzZ/K5w0zBxMyHLeNzSpYsySfjM4atnR15u/iRt58vebPzPdn36W9eTj7s4Yk36LFh5lLycfAndx8v8i8SQFvmrRBHjPPH0l/p9SqNKPDmPfL3LU4u7m7k5OpMXj5F+DVsX7SaeuktcYHhtt6kvU4vYs84JX0temdbV/Y+dsyePaccODFYPly9/2oeQx7B6Fbc/8ePHxMrqGn06NHiHVrUfILNFNkSiAqGU9qxh4OMgckWsEYh/sYowlu3btH772eckUJ/yTV1OKz+hnQM2VWJi4ujV199lWcU/MjQ0FBq2LAhXykXGRKuFmZQwWQP+hlP/Uz1b3PA7/v777/5d+K9KACYReFLVBtC9/PVe6OmQfBYZAhpeAjnz5+nHTt28GP6oDDAuXjYeD9+1/Lly8XRzOAc9atx/23tMt9XnODu5ak9SY/1M37gIwBxHsSGjHx4y1/iaGbgTk0bMoKK+5UhrCAVwwL7hh1bUtuBPcnByZFPJO3BxBYXFUNf9kmfFpRfh3jFP1yTCiYsF6n8My3lyRBrgZrn1JWUcU8xufratWv5M1Dh16SzGSPbQToyAFR34sQJOnPmDI8Jbt++TZUqVeJigWK3bNnCJ3DQB+ugP//88zwjwCLobzdu3KDOndOnsB8xYsQTCwAx4H0//vgjTZ48mc/k2K9fP75qLn7Yf//9x68nN1i8eDEXKj4XGRyvsASmrIgKMjjuDX7P6dOn6dy5c3xZa1g43DtYwJ07d4qzM/L999/z4wDfi4eM9/z5p+kJmjEZQvHnS9PGkJO0KexUhm1HwmUauSjzgjIYxx/+OFgrDKwQxQTm6ulOv0wx/hs/7/4eFfUuQRp+bXb0l+YWTfx1Hp+7al3gcar6cl1KjIvns878tn4FF8zTBvcZM+Mgr+D+Y4Trpk2buEgALMvGjRv53+aQbYEAPDRd8CA3bNhAsbHaaRRh2lauXMn/1kffhTIF1kmHGGFJJkyYkMld+uKLL7hwqlatShMnTuQuWG4ANwelN9ZuR6mPV6ztbuw3ZQXuzwsvvPBEbFgD3hAQAqwWJruANcb5EGp2hGnuuPu1X3/PrK8Hy+waFmD78QZCZOxLp09R5OMwcVY6wXcf0sP7d/gsMrGRMfTphoXiSDqTNy+myPhwqta0Pn34OZZAs9wi5AR9dxvr7GM1ZjxHPIugoCBxJPuYJRBjQLl4uFgKAaWoPnAzoGRktEWLFmXY4POzIEmcSdwawLVBhoJl6tChgziSEViqX3/9lcaNG8dNaE5ByQ+XETcSr7t37+avuA6Usr///rs40zAw5RD0gwcPeFwGq7hq1Sq6dOkSP4aHV61aNXF2OhAlxKBaaNwLfC/u5dmzZ00+VFybhgkEk1QE3b7/ZHt04y53dwyxZ+NWcnRxppiISJqy7Udy84JY0sjDxYtWfZF50f1Tfx8mZ3tXfg80SirVapl5qh5YoINKEH31x3J6Y/IoHps8C3Cf9cFzUMMCeAPmkisCQXCJUg8XYsjFQjpckK+++oq+++67TNvUqemuADKY+oOQaXLLOmSF6uZA6BA8Mh9mZkHGRgaeOzdz5lHBuXAxYdEaN25MzZo1ozZt2vDfhXR8JsSuHygCuHWwWvCZ4TqiAgKWGL8dr6asiL2DPT2+H0hdvKrSgOeaPNn6VGhIkzq+I85KZ9vCVeSCzK5RyJFZrJIvlKXOwwYw9yiBZWoX2v79L+LMdILvpj8PZxfzq4SfFihQrl27xu85vAq46VWqVOH3FoUeXPK2bduKs7NPrgiEL+TJQEZBZjAEbjBEZGjTdd0QrzwL/vjjD+7mwA1SM/KYMWN4xkXJhJjr4cOHPN0YEBIytVo7AsFBGCi54BfrgzglJCSEZ0B8z6hRo3g6Hi72YVHWrFnD04yBAN3V3SPD5mbvwaxE5vmn1k1fTM7ubjxG6D3uPZ6G6T6Tk7XzlyFY3rtmK09XSU1iz1N4TLY5CKbzGtxD3EsE47/99hvt27eP3z+IA4UzrHfr1q3F2dknVwQC1wI3mJcy7KL0gQ8I3xqlJao89Te4WirITPgc/sDYZqwGCd+ZW6ACQA3OIXa4W6hmRQWAKn5YAmOlOa4XwobFgbuHB4I0/O6KFSvSoUOHDFY7w73E5+JcWA64oAsWLOBVk3jgeLgQJ+I8Q6BgcXRypHrtmlHNFo2ebJixsEbzhuIsLfcu36BH9+9xqwNRoSZqzbSF9Nvc5RRQphS/BlcPBOsZq5c9fLy5xcG9STQRfBtz6Z4mKGxRIGFD/ggLC+MeTffu3bOs8DBGrnTdRI0BHiQyBNom9MGDRGmaHQVXr16d/0CAzIlaCUxAp0/ZsmV5NXCPHj1o4MCBfN9SVDcHoPp4zpw5PMOo+8gcCNZRmk+fPp2n6wMTjswNIK7Zs2dzK4J7061bN17Dpw+qfSEofD4E9s033/B0iAPfB/D9+LxevXrxfV0QoBcpV5Q+2/i9SDHO2q++J3dXbbUv3Km/Vmx8EuA7u2vdEBsHG7p99QqPYwLKl+bHXqhTla/uhGtMU9J40F6sbEl+TAWf09jbn6qUqkNtB75G3Ue9TV5+T3d+NHguyDuffvoprzSCy4V2EbRl5QSzLAhukj54sAis1UDUUGYGaobLClgaxB0QGzLHtGmZF4Zft24dd2XwUJF5UN1sCENBmz4XLlzgJbYqcJT++E34GxssGPbx2+GCoWIgK+AiYXFTCB2/Affnp59+Eke1rFixgosSn4v7hlo59Tuxj+tAwYLrwu9DlbEhUGpmh92/bCInFpzjOcRERPFZ1dXvi42M5rNT4logIl0rgulC0yiVTyvqxty3+cM/E0fS+X7UFCrlXJ6v67Hgy895u4o55EYXe9wreB9odqhXrx7VrFkzx+IAZgkENxcmC/74xYsXadu2bfTSSy9x9wHH4De/9dZb4ux0kJGh8EePHvH36m9qJlVBNS4aB1EK4PvQSg83BUEYgmXUXKmuWJkyZbhrow8yFt57586dTN+HBiPVdYObA+uGjIJXNNDBlVI3ZGy+OBATCdww1UpkxdatW3mmx4ODJUHJhs9QgVsJgUAMeJhw83S/F9eBe4bfCDfMVCVBVuz8aQPZ2znwWALLmU3euIgm/TqfJq6dx7cpW3/gbhpE4sQs1x8rMhYC/T8ewXv9QmAndv1D49sMoIuHT9LNs5dpzuBPaOv3K7kVQkt50ybtqUjxouKdWYOxKLBKD66xQoB9nu527cR5s1w33OvcJsvOiogRVB8dpRVKNhVkQtV3RwALVwX+ngrWUN++fTvPCMiAxuIJlLSo+YFlUBk6dCgPnCE+ZCz4lLgBKMVRKuPv+/fv09GjR3lbgwrqveGeQJQIuCFaffBZgwYN4i4NauDg5sBF+uijj2jIkCHirHRwHbAKsFoQMhorEVsgIPzss894BkbVrL4lg0jwPkzJit+I0g2NVXC7UKMCawk/GUFl7dq1xbvSQUEBi4X7h+petZJg9uCPad+abXx2+4DypWjxacMt9CpvvdCCokMj+D17sUFN+vbvzLVVmNO4i381KupXglcBj/x+aoZlzwZXa0f3r9widx9PSmGBO6wFso6zqzN32VLZM4qMCqO/Em49maAacc+gKq3Jx9+PwkMe05bwczymAe3sK5CHtyevGMDCORCnPvEUS/0++ICGzze+ytSbb77JK0BwLU2aNOF5MDuo+QTuGJ7hgAEDxJGMZGlBUIohk2HD33hY6gaBoJREfyOUerriACgdkTHwXmRy3ffqb8j4uqCERa0OrA4yOo7jPIgRmRGZHP2xdMUB1GvFhnP1v0fdkNkRU+AcXCPaaRDLGALdXnD9uA5Yta+//pqnI039fYYaAbt27cpntleDdkzufeTIEW6FcO/U32VIHACFBCwpvgOCh7UDWLcPATNqo5Kx7rUJ7l66TtdunucFVGRMGPX4cJA4khHEDC+8WIVio6J5K/tPE2aII1qWXthFLfp2osehD/n6HqglgzjQ4BgRGkIOLF78LehMhtnbEZskUQK/VnaX+LkqiWnx2nS2YQJsZzfXTJsLsTyGJcpMoN5/bMhv2UV9DzZdy65Pls4f/Dk0fKlBowoyFjIZqs8QKBsCbQIQlX7m1wfn4Hv0UTuZoaSGG4YMBYvSqFEjowE/gll8HjKUMXBTkXHRiIRMjHNRyqs1VoaYMmUKr9VCxlZNOerZIR7cG2OGGNeOjA73DQ8CpR3uG7rWINPCchoD1zR48GBeGMB6qxmgVsvGTBxJPCOXrFCOpxkDnQvbdevJM1wcizUadTIcI4Jh8z+n3xf9wi0CLAp+E56zyse/zKEPFnxBu5jLdvvCVd4K718qgOp3aJGp1gz4lSxGLTp1IjcvT+4qob+WSvt+veCzc3EYAwVAVgvrIB/AEoP69evz1+yg5hPkBbRfGUOOKJRITGBWkC6RWBtSIBKJCaRAJBITSIFIJCaQApFITCAFIpGYQApEIjGBFIhEYgIpEInEBFIgEokJpEAkEhNIgRRirhw/S5O7Zu6+r8+cIZ9Qd++aYk+iixRIIWb5xBn097bfxJ5xfl26yGBvXIkUSL5j4cjPqbWN6S7s2eXg3zupu5ExLir71m7jQ2oHz/hEpEh0kQLJZxzctJMq1K4u9ixn3fQllExJNOibcSLFMD989DVVfb5e4V7CIAdIgeQjgu89pCuPztCwuZknRjAXuFdNm3SgIsW0g4kMcfv8Fbr26By9O/1jkSLRRwrEAJjlo3+ZxnT+n+N8/96Vm/TPhj/o6O97+b4hAm/do28GjKbmNsWpiU1RlvmuiiNapr/xP/ppwkz+9/KJs/jMhxcO/sf3VZaO/Zoql6xN1ZvWp7P7j/Jhr5+0N+wi7fhhLc0bOolWfDqbWYGvRKqWg5v+pMdpgTR2uXbYLCZqwHSk+vw4/lvyIX9q+lp7kZIORk3euXBN7FkxGFEoycjm735SmlMJZXTT3kobm+eU2uTCF4LBojXv1+4kzkpn8Zgv+TkNyEt5t2pbpb39C8rw+l3FUS2NqIjy1eujlI4ulfjfWFSmNrnyY+NaD1DGtHhdedXpRaW9QwWlHnnwz8MCM0v0FrcJunOfXVN5fs7opr34Ijgvsc/TpXdAfX7s4fXbSlevGkoNcuDnfNlnhDhDUVJTUvhnMIGJFC1MGMqY5n2VamTPf28zClDSUlPFUetDCsQAE199W+ngVJFnqq/6jVJCHgTx9E/avcVFkJSQyPfB6Ca9eGb+bd5ynrlAn+INle4+Nfnf4NrJ81wQL5Of8sPYr3napjnLlIEVW/K/h9XtzMXRxbOasmj0VIVZACUxPoEf0+XysTNKdZZxmVURKQrPxMsnzhR7inLpyCkm7pJKv9Iv8+9bP+MHfr09/esqb1VoIc5SlKXjv2EC8RR7WgJv3Vfqs7T3ar6qxEREKbPeGc/3g+48EGdYH1IgBmhMRbkliAnPuAzatL4j+JJhKl/0eJ+Xwo9u3hUpWjowK/BRy35iT1G+7j+aic1X2ffrdpGSGWTm1V8aX6otOjxSqUmOyvzhn4kURdm68Gdm2dxZCZ8mUhRlZKMe/PpnvD1WpGhpSD7Kys/miD1FeYVKKZ91GSz2FPZbI/k53384he+f3H2IW9EPGmS0hNaGFIgezLfnIjix6x+RoiUiOJRn8vFt3+D7J3cfVKqQrXLh0Am+r3Lot11KHeY66b4fmX/WO+PEXmaWT5rFLZM+45nrpdK7eIMMbltkSBi3Hp92flekKMzSBSq1mDX7c1nGNfk+bvsmc5WKiz1F2bN6C18zkMUYfP/+lVvMFavO3TW4kBBKLXJW5n+Qed1Ba0MKRI83yjdVOrtVEXtabp2/orRgJS7iEZWefnWZq/OW2EsHccN7tTqKPUXZ/fNmntn0rZEur/nXUT5s3FPsaXnNr46yZtpC/vexHft4HJGaoo0Fwh4FK62pPM/0aiYHiDEQw+iy5KNpSlUm5GsnzosURelbspHSr0xjsad1KXHdk7sN4a7X8T/2iSMSKRAdgu8+4D73Xys38f3woBCeaWqSE89QmjStK4PSG0H7/nUZXSb4+QjQdXn7xZbKiEbdxZ5hGjCLNVNYmPDAEKWrZ3Xlncqt+T4Y+dJryoiG2s/Y88sWfo2d3as+iWFUkP7nsvX87/iYOGZxujBhOSqn9x7haeDGmUv8vN91VpYdzywMBKnPqi++426lNSMFogP8e9QQoRTu7FaVu0qtqEyGzATuXLzG3abhzD8/u/+osu7bJdzv7+5TS5yhBW4ZrIe+u6YPMjuCeLwfNVtvPNdMHNHyQYNuPK7p4lGNL798Zt+//Ps2zPxBnKEov0ydx9N+X7ya10IhmH/rhRZKbGRGy/V1/w+5OxcdFiFSFGUAs5r43Qc371QuHT3NPms+X9oZvzHw9n1xlnUiBaIDMgX89dnvfqx83v095RDLMMYYXLUdj0kQpKNEXjjyc3EknW3fr2LujZ3YM07I/UD2vW/wjK0fP4CEuHh+PeumL+b7u5Zv4DFESlIy3wdwk3oUqc3jlrGt+itnmHANMahSK2VAuSZiT8tlJgqIFGKGQPuweOdX8V3WjpxZUfDv9r/pgy7daPv1C1Tihez1hWIZm0+6LLtpFF6kQATD6nbm0/BvCj0lUiQS2dWEExUSTsdO7ePr9UkkukiBMH7myx8r1OujwdoEiUQgXSyJxATSgkgkJpACkUhMIAUikZhACkQiMYEUiERiAikQicQEUiASiQmkQCQSE0iBSCRGIfo/uABtW+EmxJEAAAAASUVORK5CYII=';

window.generarPDF = function generarPDF(){    
    if(jsonResult.captura.formato =="SIMPLIFICADA"){
        gerarPdfDecSimplificada();
    }
    else{
        gerarPdfDecCompleta();
    }
}

//------------------------------------------------------//

function gerarPdfDecSimplificada(){
    var doc = new jspdf();//'p', 'pt', 'letter');
    doc.setProperties({
        title: 'Declaracion Patrimonial y de Intereses',
        subject: 'This is the subject',
        author: 'Gobierno del Estado de Chiapas ',
        keywords: 'declaración, patrimonial, ',
        creator: 'DeclaraFácil PI'
    });

    //var numPaginas =0;
    llenarPDF();

    doc.setFontSize(8);
    //doc.setTextColor(300);
    doc.text('TIPO DE DECLARACIÓN:', 48, 30, {maxWidth: 50, align: "right"});
    doc.text('FORMATO:', 48, 35, {maxWidth: 50, align: "right"});
    doc.text('FECHA DE IMPRESIÓN:', 48, 40, {maxWidth: 50, align: "right"});
    doc.text('ENTE PÚBLICO:', 48, 45, {maxWidth: 50, align: "right"});

    doc.text(jsonResult.captura.tipo_declaracion, 50, 30);
    doc.text(jsonResult.captura.formato, 50, 35);
    doc.text(getDateTime(), 50, 40);
    doc.text(jsonResult.declaracion.situacionPatrimonial.datosEmpleoCargoComision.nombreEntePublico, 50, 45);

    doc.setLineWidth(0.2);
    doc.setDrawColor(140,140,140);
    doc.line(15, 48, 200, 48);

    doc.setFontSize(8);
    doc.text('C. ' + $("input[name='nameContralor']").val() + ', BAJO PROTESTA DE DECIR VERDAD, PRESENTO A USTED MI DECLARACIÓN DE SITUACIÓN PATRIMONIAL Y DE INTERESES, CONFORME A LO DISPUESTO EN LA LEY GENERAL DE RESPONSABILIDADES ADMINISTRATIVAS, LA LEY GENERAL DEL SISTEMA NACIONAL ANTICORRUPCIÓN Y LA NORMATIVIDAD APLICABLE.', 15, 60, {maxWidth: 180, align: "justify"})
    
    //DATOS GENERALES
    doc.autoTable({ html: '#pdfTitulo1', margin: { top: 25, bottom:0 }, styles: { fontSize: 12 },  startY: 80, useCss: true });  
    finalY = doc.lastAutoTable.finalY;
    doc.autoTable({ html: '#pdfMiDeclaracion_datosGenerales', margin: { top: 0, bottom:25 }, styles: { fontSize: 8 }, startY: finalY + 1, useCss: true });    
    
    //DOMICILIO DECLARANTE
    finalY = doc.lastAutoTable.finalY;
    doc.autoTable({ html: '#pdfTitulo2', margin: { top: 25, bottom:0 }, styles: { fontSize: 12 }, startY: finalY + 10, useCss: true });  
    finalY = doc.lastAutoTable.finalY;
    if(jsonResult.declaracion.situacionPatrimonial.domicilioDeclarante.domicilio =="MX"){
        doc.autoTable({ html: '#pdfMiDeclaracion_domicilioDeclarante', margin: { top: 0, bottom:25 }, styles: { fontSize: 8 }, startY: finalY + 1, useCss: true, didDrawPage: function (data) { data.settings.margin.top = 30; } });
    }
    else{
        doc.autoTable({ html: '#pdfMiDeclaracion_domicilioDeclaranteEXT', margin: { top: 0, bottom:25 }, styles: { fontSize: 8 }, startY: finalY + 1, useCss: true, didDrawPage: function (data) { data.settings.margin.top = 30; } });
    }
    finalY = doc.lastAutoTable.finalY;
    
    //DATOS CURRICULARES.
    doc.autoTable({ html: '#pdfMiDeclaracion_datosCurricularesDeclarante', margin: { top: 25, bottom:25 }, styles: { fontSize: 8 }, startY: finalY + 10, useCss: true, didDrawPage: function (data) { data.settings.margin.top = 30; }, rowPageBreak: 'auto' });   
    
    //DATOS DEL EMPLEO, CARGO O COMISION.
    finalY = doc.lastAutoTable.finalY;
    doc.autoTable({ html: '#pdfMiDeclaracion_datosEmpleoCargoComision', margin: { top: 25, bottom:25 }, styles: { fontSize: 8 }, startY: finalY + 10, useCss: true, didDrawPage: function (data) { data.settings.margin.top = 30; }, rowPageBreak: 'auto' });   
    finalY = doc.lastAutoTable.finalY;
    if(jsonResult.declaracion.situacionPatrimonial.domicilioDeclarante.domicilio =="MX"){
        doc.autoTable({ html: '#pdfMiDeclaracion_datosEmpleoCargoComisionDOMMX', margin: { top: 0, bottom:25 }, styles: { fontSize: 8 }, startY: finalY + 1, useCss: true, didDrawPage: function (data) { data.settings.margin.top = 30; }, rowPageBreak: 'auto'  });
    }
    else{
        doc.autoTable({ html: '#pdfMiDeclaracion_datosEmpleoCargoComisionDOMEXT', margin: { top: 0, bottom:25 }, styles: { fontSize: 8 }, startY: finalY + 1, useCss: true, didDrawPage: function (data) { data.settings.margin.top = 30; }, rowPageBreak: 'auto'  });
    }

    //EXPERIENCIA LABORAL.
    finalY = doc.lastAutoTable.finalY;
    doc.autoTable({ html: '#pdfMiDeclaracion_experienciaLaboral', margin: { top: 25, bottom:25 }, styles: { fontSize: 8 }, startY: finalY + 10, useCss: true, didDrawPage: function (data) { data.settings.margin.top = 30; }, rowPageBreak: 'auto' });

    //INGRESOS.
    finalY = doc.lastAutoTable.finalY;
    doc.autoTable({ html: '#pdfMiDeclaracion_ingresos', columnStyles: { 0: {cellWidth: 158}, 1: {cellWidth: 30 } }, margin: { top: 25, bottom:25 }, styles: { fontSize: 8 }, startY: finalY + 10, useCss: true, didDrawPage: function (data) { data.settings.margin.top = 30; }, rowPageBreak: 'auto' });
   
    //DESEMPEÑO SERVIDOR PUBLICO AÑO ANTERIOR. 
    if (jsonResult.captura.tipo_declaracion !="MODIFICACION"){    
        finalY = doc.lastAutoTable.finalY;
        doc.autoTable({ html: '#pdfMiDeclaracion_desempenoServidorPublico', columnStyles: { 0: {cellWidth: 158}, 1: {cellWidth: 30 } }, margin: { top: 25, bottom:25 }, styles: { fontSize: 8 }, startY: finalY + 10, useCss: true, didDrawPage: function (data) { data.settings.margin.top = 30; }, rowPageBreak: 'auto' });
    }

    headeFooter(doc);
    descargar(doc);        
}

function gerarPdfDecCompleta(){
    var doc = new jspdf();//'p', 'pt', 'letter');
    doc.setProperties({
        title: 'Declaracion Patrimonial y de Intereses',
        subject: 'This is the subject',
        author: 'Gobierno del Estado de Chiapas ',
        keywords: 'declaración, patrimonial, ',
        creator: 'DeclaraFácil PI'
    });

    //var numPaginas =0;
    llenarPDF();

    doc.setFontSize(8);
    //doc.setTextColor(300);
    doc.text('TIPO DE DECLARACIÓN:', 48, 30, {maxWidth: 50, align: "right"});
    doc.text('FORMATO:', 48, 35, {maxWidth: 50, align: "right"});
    doc.text('FECHA DE IMPRESIÓN:', 48, 40, {maxWidth: 50, align: "right"});
    doc.text('ENTE PÚBLICO:', 48, 45, {maxWidth: 50, align: "right"});

    doc.text(jsonResult.captura.tipo_declaracion, 50, 30);
    doc.text(jsonResult.captura.formato, 50, 35);
    doc.text(getDateTime(), 50, 40);
    doc.text(jsonResult.declaracion.situacionPatrimonial.datosEmpleoCargoComision.nombreEntePublico, 50, 45);

    doc.setLineWidth(0.2);
    doc.setDrawColor(140,140,140);
    doc.line(15, 48, 200, 48);

    doc.setFontSize(8);
    doc.text('C. ' + $("input[name='nameContralor']").val() + ', BAJO PROTESTA DE DECIR VERDAD, PRESENTO A USTED MI DECLARACIÓN DE SITUACIÓN PATRIMONIAL Y DE INTERESES, CONFORME A LO DISPUESTO EN LA LEY GENERAL DE RESPONSABILIDADES ADMINISTRATIVAS, LA LEY GENERAL DEL SISTEMA NACIONAL ANTICORRUPCIÓN Y LA NORMATIVIDAD APLICABLE.', 15, 60, {maxWidth: 180, align: "justify"})
    
    //DATOS GENERALES
    doc.autoTable({ html: '#pdfTitulo1', margin: { top: 25, bottom:0 }, styles: { fontSize: 12 },  startY: 80, useCss: true });  
    finalY = doc.lastAutoTable.finalY;
    doc.autoTable({ html: '#pdfMiDeclaracion_datosGenerales', margin: { top: 0, bottom:25 }, styles: { fontSize: 8 }, startY: finalY + 1, useCss: true });    
    
    //DOMICILIO DECLARANTE
    finalY = doc.lastAutoTable.finalY;
    doc.autoTable({ html: '#pdfTitulo2', margin: { top: 25, bottom:0 }, styles: { fontSize: 12 }, startY: finalY + 10, useCss: true });  
    finalY = doc.lastAutoTable.finalY;
    if(jsonResult.declaracion.situacionPatrimonial.domicilioDeclarante.domicilio =="MX"){
        doc.autoTable({ html: '#pdfMiDeclaracion_domicilioDeclarante', margin: { top: 0, bottom:25 }, styles: { fontSize: 8 }, startY: finalY + 1, useCss: true, didDrawPage: function (data) { data.settings.margin.top = 30; } });
    }
    else{
        doc.autoTable({ html: '#pdfMiDeclaracion_domicilioDeclaranteEXT', margin: { top: 0, bottom:25 }, styles: { fontSize: 8 }, startY: finalY + 1, useCss: true, didDrawPage: function (data) { data.settings.margin.top = 30; } });
    }
    finalY = doc.lastAutoTable.finalY;
    
    //DATOS CURRICULARES.
    doc.autoTable({ html: '#pdfMiDeclaracion_datosCurricularesDeclarante', margin: { top: 25, bottom:25 }, styles: { fontSize: 8 }, startY: finalY + 10, useCss: true, didDrawPage: function (data) { data.settings.margin.top = 30; }, rowPageBreak: 'auto' });   
    
    //DATOS DEL EMPLEO, CARGO O COMISION.
    finalY = doc.lastAutoTable.finalY;
    doc.autoTable({ html: '#pdfMiDeclaracion_datosEmpleoCargoComision', margin: { top: 25, bottom:25 }, styles: { fontSize: 8 }, startY: finalY + 10, useCss: true, didDrawPage: function (data) { data.settings.margin.top = 30; }, rowPageBreak: 'auto' });   
    finalY = doc.lastAutoTable.finalY;
    if(jsonResult.declaracion.situacionPatrimonial.domicilioDeclarante.domicilio =="MX"){
        doc.autoTable({ html: '#pdfMiDeclaracion_datosEmpleoCargoComisionDOMMX', margin: { top: 0, bottom:25 }, styles: { fontSize: 8 }, startY: finalY + 1, useCss: true, didDrawPage: function (data) { data.settings.margin.top = 30; }, rowPageBreak: 'auto'  });
    }
    else{
        doc.autoTable({ html: '#pdfMiDeclaracion_datosEmpleoCargoComisionDOMEXT', margin: { top: 0, bottom:25 }, styles: { fontSize: 8 }, startY: finalY + 1, useCss: true, didDrawPage: function (data) { data.settings.margin.top = 30; }, rowPageBreak: 'auto'  });
    }

    //EXPERIENCIA LABORAL.
    finalY = doc.lastAutoTable.finalY;
    doc.autoTable({ html: '#pdfMiDeclaracion_experienciaLaboral', margin: { top: 25, bottom:25 }, styles: { fontSize: 8 }, startY: finalY + 10, useCss: true, didDrawPage: function (data) { data.settings.margin.top = 30; }, rowPageBreak: 'auto' });

    //DATOS DE LA PAREJA.
    finalY = doc.lastAutoTable.finalY;
    doc.autoTable({ html: '#pdfMiDeclaracion_datos_pareja', margin: { top: 25, bottom:25 }, styles: { fontSize: 8 }, startY: finalY + 10, useCss: true, didDrawPage: function (data) { data.settings.margin.top = 30; }, rowPageBreak: 'auto' });
  
    //DATOS DEL DEPENDIENTE ECONOMICO.
    finalY = doc.lastAutoTable.finalY;
    doc.autoTable({ html: '#pdfMiDeclaracion_datos_dependiente_eco', margin: { top: 25, bottom:25 }, styles: { fontSize: 8 }, startY: finalY + 10, useCss: true, didDrawPage: function (data) { data.settings.margin.top = 30; }, rowPageBreak: 'auto' });
    
    //INGRESOS.
    finalY = doc.lastAutoTable.finalY;
    doc.autoTable({ html: '#pdfMiDeclaracion_ingresos', columnStyles: { 0: {cellWidth: 158}, 1: {cellWidth: 30 } }, margin: { top: 25, bottom:25 }, styles: { fontSize: 8 }, startY: finalY + 10, useCss: true, didDrawPage: function (data) { data.settings.margin.top = 30; }, rowPageBreak: 'auto' });
   
    //DESEMPEÑO SERVIDOR PUBLICO AÑO ANTERIOR. 
    if (jsonResult.captura.tipo_declaracion !="MODIFICACION"){    
        finalY = doc.lastAutoTable.finalY;
        doc.autoTable({ html: '#pdfMiDeclaracion_desempenoServidorPublico', columnStyles: { 0: {cellWidth: 158}, 1: {cellWidth: 30 } }, margin: { top: 25, bottom:25 }, styles: { fontSize: 8 }, startY: finalY + 10, useCss: true, didDrawPage: function (data) { data.settings.margin.top = 30; }, rowPageBreak: 'auto' });
    }

    //BIENES INMUEBLES.
    finalY = doc.lastAutoTable.finalY;
    doc.autoTable({ html: '#pdfMiDeclaracion_bienes_inmuebles', margin: { top: 25, bottom:25 }, styles: { fontSize: 8 }, startY: finalY + 10, useCss: true, didDrawPage: function (data) { data.settings.margin.top = 30; }, rowPageBreak: 'auto' });
  
    //VEHICULOS.
    finalY = doc.lastAutoTable.finalY;
    doc.autoTable({ html: '#pdfMiDeclaracion_vehiculos', margin: { top: 25, bottom:25 }, styles: { fontSize: 8 }, startY: finalY + 10, useCss: true, didDrawPage: function (data) { data.settings.margin.top = 30; }, rowPageBreak: 'auto' });
   
    //BIENES MUEBLES.
    finalY = doc.lastAutoTable.finalY;
    doc.autoTable({ html: '#pdfMiDeclaracion_bienes_muebles', margin: { top: 25, bottom:25 }, styles: { fontSize: 8 }, startY: finalY + 10, useCss: true, didDrawPage: function (data) { data.settings.margin.top = 30; }, rowPageBreak: 'auto' });
   
    //INVERSIONES.
    finalY = doc.lastAutoTable.finalY;
    doc.autoTable({ html: '#pdfMiDeclaracion_inversiones', margin: { top: 25, bottom:25 }, styles: { fontSize: 8 }, startY: finalY + 10, useCss: true, didDrawPage: function (data) { data.settings.margin.top = 30; }, rowPageBreak: 'auto' });
   
    //ADEUDOS.
    finalY = doc.lastAutoTable.finalY;
    doc.autoTable({ html: '#pdfMiDeclaracion_adeudos', margin: { top: 25, bottom:25 }, styles: { fontSize: 8 }, startY: finalY + 10, useCss: true, didDrawPage: function (data) { data.settings.margin.top = 30; }, rowPageBreak: 'auto' });
    
    //PRESTAMOS O COMODATOS.
    finalY = doc.lastAutoTable.finalY;
    doc.autoTable({ html: '#pdfMiDeclaracion_prestamoOComodato', margin: { top: 25, bottom:25 }, styles: { fontSize: 8 }, startY: finalY + 10, useCss: true, didDrawPage: function (data) { data.settings.margin.top = 30; }, rowPageBreak: 'auto' });
    


    //INTERESES TITULO
    finalY = doc.lastAutoTable.finalY;
    doc.autoTable({ html: '#pdfMiDeclaracion_interes_titulo', margin: { top: 25, bottom:25 }, styles: { fontSize: 8 }, startY: finalY + 10, useCss: true, didDrawPage: function (data) { data.settings.margin.top = 30; }, rowPageBreak: 'auto' });
    
    //PARTICIPACION EMPRESAS
    finalY = doc.lastAutoTable.finalY;
    doc.autoTable({ html: '#pdfMiDeclaracion_participacion', margin: { top: 25, bottom:25 }, styles: { fontSize: 8 }, startY: finalY + 10, useCss: true, didDrawPage: function (data) { data.settings.margin.top = 30; }, rowPageBreak: 'auto' });
    
    //PARTICIPACION INSTITUCIONES
    finalY = doc.lastAutoTable.finalY;
    doc.autoTable({ html: '#pdfMiDeclaracion_participacionTomaDecisiones', margin: { top: 25, bottom:25 }, styles: { fontSize: 8 }, startY: finalY + 10, useCss: true, didDrawPage: function (data) { data.settings.margin.top = 30; }, rowPageBreak: 'auto' });
    
    //APOYOS
    finalY = doc.lastAutoTable.finalY;
    doc.autoTable({ html: '#pdfMiDeclaracion_apoyos', margin: { top: 25, bottom:25 }, styles: { fontSize: 8 }, startY: finalY + 10, useCss: true, didDrawPage: function (data) { data.settings.margin.top = 30; }, rowPageBreak: 'auto' });
    
    //REPRESENTACION
    finalY = doc.lastAutoTable.finalY;
    doc.autoTable({ html: '#pdfMiDeclaracion_representacion', margin: { top: 25, bottom:25 }, styles: { fontSize: 8 }, startY: finalY + 10, useCss: true, didDrawPage: function (data) { data.settings.margin.top = 30; }, rowPageBreak: 'auto' });
    
    //CLIENTES PRINCIPALES
    finalY = doc.lastAutoTable.finalY;
    doc.autoTable({ html: '#pdfMiDeclaracion_clientesPrincipales', margin: { top: 25, bottom:25 }, styles: { fontSize: 8 }, startY: finalY + 10, useCss: true, didDrawPage: function (data) { data.settings.margin.top = 30; }, rowPageBreak: 'auto' });
    
    //BENEFICIOS PRIVADOS
    finalY = doc.lastAutoTable.finalY;
    doc.autoTable({ html: '#pdfMiDeclaracion_beneficiosPrivados', margin: { top: 25, bottom:25 }, styles: { fontSize: 8 }, startY: finalY + 10, useCss: true, didDrawPage: function (data) { data.settings.margin.top = 30; }, rowPageBreak: 'auto' });
    
    //FIDEICOMISOS
    finalY = doc.lastAutoTable.finalY;
    doc.autoTable({ html: '#pdfMiDeclaracion_fideicomisos', margin: { top: 25, bottom:25 }, styles: { fontSize: 8 }, startY: finalY + 10, useCss: true, didDrawPage: function (data) { data.settings.margin.top = 30; }, rowPageBreak: 'auto' });    
    
    headeFooter(doc);
    descargar(doc);
}

//------------------------------------------------------//
function headeFooter(doc){
    let numPaginas =0;
    numPaginas = doc.getNumberOfPages();
    for (var i = 1; i <= numPaginas; i++) {
        doc.setPage(i);
        doc.setFontSize(14);
        //header

        doc.addImage(base64Img, 'PNG', 15, 3, 20, 20)

        doc.text("DeclaraFácil", 105, 10, null, null, "center");
        doc.setFontSize(10);
        doc.text("Sistema de Declaración Patrimonial y de Intereses Portable", 105, 15, null, null, "center");
        //footer
        doc.setFontSize(8);
        var declarante = jsonResult.declaracion.situacionPatrimonial.datosGenerales.nombre + " " + jsonResult.declaracion.situacionPatrimonial.datosGenerales.primerApellido + " " +jsonResult.declaracion.situacionPatrimonial.datosGenerales.segundoApellido;
        doc.setLineWidth(0.2);
        doc.setDrawColor(140,140,140);
        doc.line(15, doc.internal.pageSize.height-13, 60, doc.internal.pageSize.height-13);
        doc.text(declarante, 15, doc.internal.pageSize.height-10, null, null, "left");
        doc.text("Página " + i + " de " + numPaginas, 200, doc.internal.pageSize.height-10, null, null, "right");
    }
}

function descargar(doc){
    let fecha = new Date();    
    //archivo .dec
    let text = JSON.stringify(jsonResult);
    let filename = jsonResult.declaracion.situacionPatrimonial.datosGenerales.curp + "_" + jsonResult.captura.tipo_declaracion + "_" + fecha.getFullYear() + ".dec";                    
    download(filename, text);

    //archivo .pdf
    filename = jsonResult.declaracion.situacionPatrimonial.datosGenerales.curp + "_" + jsonResult.captura.tipo_declaracion + "_" + fecha.getFullYear() + ".pdf";
    doc.save(filename);
}

//------------------------------------------------------//

function llenarPDF(){
    //GENERALES
    $(".pdfDec_tipo").text(jsonResult.captura.tipo_declaracion);
    $(".pdfDec_formato").text(jsonResult.captura.formato);
    $(".pdfDec_entepub").text(jsonResult.declaracion.situacionPatrimonial.datosEmpleoCargoComision.nombreEntePublico);
    if(jsonResult.captura.formato =="SIMPLIFICADA"){
        tblDatosGenerales();
        tblDomicilio();
        tblDatosCurriculares();
        tblEmpleo();
        tblCV();
        tblIngresos("6. INGRESOS NETOS DEL DECLARANTE, PAREJA Y/O DEPENDIENTES ECONÓMICOS");
        if (jsonResult.captura.tipo_declaracion !="MODIFICACION"){tblDesempenoServidorPublico("7. ¿TE DESEMPEÑASTE COMO SERVIDOR PÚBLICO EL AÑO INMEDIATO ANTERIOR?");}        
    }
    else{
        if (jsonResult.captura.tipo_declaracion =="MODIFICACION"){
            tblDatosGenerales();
            tblDomicilio();
            tblDatosCurriculares();
            tblEmpleo();
            tblCV();
            tblPareja("6. DATOS DE LA PAREJA");
            tblDependienteEco("7. DATOS DEL DEPENDIENTE ECONÓMICO");
            tblIngresos("8. INGRESOS NETOS DEL DECLARANTE, PAREJA Y/O DEPENDIENTES ECONÓMICOS");
            //tblBienesInMuebles("9. BIENES INMUEBLES");
            tblVehiculos("10. VEHÍCULOS");
            tblBienesMuebles("11. BIENES MUEBLES");
            tblInversiones("12. INVERSIONES, CUENTAS BANCARIAS Y OTRO TIPO DE VALORES/ACTIVOS.");
            tblAdeudos("13. ADEUDOS/PASIVOS");
            tblPrestamoOComodato("14. PRÉSTAMO O COMODATO POR TERCEROS");
            /* intereses */
            tblInteresesTitulo();
            tblParticipacionEmpresas();
            tblParticipacionInstituciones();
            tblApoyos();
            tblRepresentacion();
            tblClientes();
            tblBeneficios();
            tblFideicomisos();
        }
        else{
            tblDatosGenerales();
            tblDomicilio();
            tblDatosCurriculares();
            tblEmpleo();
            tblCV();
            tblPareja("6. DATOS DE LA PAREJA");
            tblDependienteEco("7. DATOS DEL DEPENDIENTE ECONÓMICO");
            tblIngresos("8. INGRESOS NETOS DEL DECLARANTE, PAREJA Y/O DEPENDIENTES ECONÓMICOS");
            tblDesempenoServidorPublico("9. ¿TE DESEMPEÑASTE COMO SERVIDOR PÚBLICO EL AÑO INMEDIATO ANTERIOR?");
            //tblBienesInMuebles("10. BIENES INMUEBLES");
            tblVehiculos("11. VEHÍCULOS");
            tblBienesMuebles("12. BIENES MUEBLES");
            tblInversiones("13. INVERSIONES, CUENTAS BANCARIAS Y OTRO TIPO DE VALORES/ACTIVOS.");
            tblAdeudos("14. ADEUDOS/PASIVOS");
            tblPrestamoOComodato("15. PRÉSTAMO O COMODATO POR TERCEROS");
            /* intereses */
            tblInteresesTitulo();
            tblParticipacionEmpresas();
            tblParticipacionInstituciones();
            tblApoyos();
            tblRepresentacion();
            tblClientes();
            tblBeneficios();
            tblFideicomisos();
        }    
    } 
}

//------------------------------------------------------//

function tblDatosGenerales(){
    //DATOS GENERALES
    let nodo = jsonResult.declaracion.situacionPatrimonial.datosGenerales;
    $("#pdfMiDeclaracion_datosGenerales .nombre").text(nodo.nombre);
    $("#pdfMiDeclaracion_datosGenerales .primerApellido").text(nodo.primerApellido);
    $("#pdfMiDeclaracion_datosGenerales .segundoApellido").text(nodo.segundoApellido);
    $("#pdfMiDeclaracion_datosGenerales .curp").text(nodo.curp);
    $("#pdfMiDeclaracion_datosGenerales .rfc").text(nodo.rfc.rfc);
    $("#pdfMiDeclaracion_datosGenerales .homoClave").text(nodo.rfc.homoClave);
    $("#pdfMiDeclaracion_datosGenerales .correoElectronico_institucional").text(nodo.correoElectronico.institucional);
    $("#pdfMiDeclaracion_datosGenerales .correoElectronico_personal").text(nodo.correoElectronico.personal);
    $("#pdfMiDeclaracion_datosGenerales .telefono_casa").text(nodo.telefono.casa);
    $("#pdfMiDeclaracion_datosGenerales .telefono_celularPersonal").text(nodo.telefono.celularPersonal);
    $("#pdfMiDeclaracion_datosGenerales .situacionPersonalEstadoCivil").text(nodo.situacionPersonalEstadoCivil.valor);
    $("#pdfMiDeclaracion_datosGenerales .regimenMatrimonial").text(nodo.regimenMatrimonial.valor);
    $("#pdfMiDeclaracion_datosGenerales .paisNacimiento").text(nodo.paisNacimiento);
    $("#pdfMiDeclaracion_datosGenerales .aclaracionesObservaciones").text(nodo.aclaracionesObservaciones);
}

function tblDomicilio(){
    //DOMICILIO.
    let nodo = jsonResult.declaracion.situacionPatrimonial.domicilioDeclarante;
    if (nodo.domicilio == "MX"){
        //mexico
        $("#pdfMiDeclaracion_domicilioDeclarante .calle").text(nodo.domicilioMexico.calle);
        $("#pdfMiDeclaracion_domicilioDeclarante .numeroExterior").text(nodo.domicilioMexico.numeroExterior);
        $("#pdfMiDeclaracion_domicilioDeclarante .numeroInterior").text(nodo.domicilioMexico.numeroInterior);
        $("#pdfMiDeclaracion_domicilioDeclarante .coloniaLocalidad").text(nodo.domicilioMexico.coloniaLocalidad);
        $("#pdfMiDeclaracion_domicilioDeclarante .municipioAlcaldia").text(nodo.domicilioMexico.municipioAlcaldia.valor.toUpperCase());
        $("#pdfMiDeclaracion_domicilioDeclarante .entidadFederativa").text(nodo.domicilioMexico.entidadFederativa.valor.toUpperCase());
        $("#pdfMiDeclaracion_domicilioDeclarante .codigoPostal").text(nodo.domicilioMexico.codigoPostal);
        $("#pdfMiDeclaracion_domicilioDeclarante .aclaracionesObservaciones").text(nodo.aclaracionesObservaciones);
    }
    else{
        //extranjero
        $("#pdfMiDeclaracion_domicilioDeclaranteEXT .calle").text(nodo.domicilioMexico.calle);
        $("#pdfMiDeclaracion_domicilioDeclaranteEXT .numeroExterior").text(nodo.domicilioMexico.numeroExterior);
        $("#pdfMiDeclaracion_domicilioDeclaranteEXT .numeroInterior").text(nodo.domicilioMexico.numeroInterior);
        $("#pdfMiDeclaracion_domicilioDeclaranteEXT .coloniaLocalidad").text(nodo.domicilioMexico.coloniaLocalidad);
        $("#pdfMiDeclaracion_domicilioDeclaranteEXT .estadoProvincia").text(nodo.domicilioMexico.estadoProvincia);
        $("#pdfMiDeclaracion_domicilioDeclaranteEXT .pais").text(nodo.domicilioMexico.pais);
        $("#pdfMiDeclaracion_domicilioDeclaranteEXT .codigoPostal").text(nodo.domicilioMexico.codigoPostal);
        $("#pdfMiDeclaracion_domicilioDeclaranteEXT .aclaracionesObservaciones").text(nodo.aclaracionesObservaciones);
    }
}

function tblDatosCurriculares(){
    let html="";
     html+='<tr><td colspan="5" style="background-color: #621132; color: #fff; font-size:14px;">3. DATOS CURRICULARES</td></tr>';
    Object.keys(jsonResult.declaracion.situacionPatrimonial.datosCurricularesDeclarante.escolaridad).forEach(function (index) {
        var nodo = jsonResult.declaracion.situacionPatrimonial.datosCurricularesDeclarante.escolaridad[index];
        html +='    <tr style="background-color: #dee2e6;">\
                        <td style="width: 20%;">NIVEL</td>\
                        <td style="width: 20%;">DOCUMENTO OBTENIDO</td>\
                        <td style="width: 20%;">FECHA OBTENCIÓN</td>\
                        <td style="width: 20%;">ESTATUS</td>\
                        <td style="width: 20%;">UBICACIÓN</td>\
                    </tr>\
                    <tr>\
                        <td style="width: 20%;">' + nodo.nivel.valor + '</td>\
                        <td style="width: 20%;">' + nodo.documentoObtenido + '</td>\
                        <td style="width: 20%;">' + nodo.fechaObtencion + '</td>\
                        <td style="width: 20%;">' + nodo.estatus + '</td>\
                        <td style="width: 20%;">' + nodo.institucionEducativa.ubicacion + '</td>\
                    </tr>\
                    <tr style="background-color: #dee2e6;">\
                        <td colspan="3">INSTITUCIÓN EDUCATIVA</td>\
                        <td colspan="2">CARRERA O ÁREA DE CONOCIMIENTO</td>\
                    </tr>\
                    <tr>\
                        <td colspan="3">' + nodo.institucionEducativa.nombre + '</td>\
                        <td colspan="2">' + nodo.carreraAreaConocimiento + '</td>\
                    </tr>';
    });

    html+=' <tr>\
                <td style="background-color: #dee2e6;" colspan="5">ACLARACIONES/OBSERVACIONES</td>\
            </tr>\
            <tr>\
                <td colspan="5" style="height:80px;">' + jsonResult.declaracion.situacionPatrimonial.datosCurricularesDeclarante.aclaracionesObservaciones + '</td>\
            </tr>';
    $("#pdfMiDeclaracion_datosCurricularesDeclarante>tbody").empty().append(html);
}

function tblEmpleo(){
    //DATOS DEL EMPLEO, CARGO O COMISIÓN
    let nodo = jsonResult.declaracion.situacionPatrimonial.datosEmpleoCargoComision;
    $("#pdfMiDeclaracion_datosEmpleoCargoComision .ambitoPublico").text(nodo.ambitoPublico);
    $("#pdfMiDeclaracion_datosEmpleoCargoComision .areaAdscripcion").text(nodo.areaAdscripcion);
    $("#pdfMiDeclaracion_datosEmpleoCargoComision .contratadoPorHonorarios").text(nodo.contratadoPorHonorarios);
    $("#pdfMiDeclaracion_datosEmpleoCargoComision .empleoCargoComision").text(nodo.empleoCargoComision);
    $("#pdfMiDeclaracion_datosEmpleoCargoComision .fechaTomaPosesion").text(nodo.fechaTomaPosesion);
    $("#pdfMiDeclaracion_datosEmpleoCargoComision .funcionPrincipal").text(nodo.funcionPrincipal);
    $("#pdfMiDeclaracion_datosEmpleoCargoComision .nivelEmpleoCargoComision").text(nodo.nivelEmpleoCargoComision);
    $("#pdfMiDeclaracion_datosEmpleoCargoComision .nivelOrdenGobierno").text(nodo.nivelOrdenGobierno);
    $("#pdfMiDeclaracion_datosEmpleoCargoComision .nombreEntePublico").text(nodo.nombreEntePublico);
    $("#pdfMiDeclaracion_datosEmpleoCargoComision .telefonoOficina").text(nodo.telefonoOficina.telefono + " EXT. " + nodo.telefonoOficina.extension);
    
    if (nodo.domicilio == "MX"){
        //mexico
        $("#pdfMiDeclaracion_datosEmpleoCargoComisionDOMMX .calle").text(nodo.domicilioMexico.calle);
        $("#pdfMiDeclaracion_datosEmpleoCargoComisionDOMMX .numeroExterior").text(nodo.domicilioMexico.numeroExterior);
        $("#pdfMiDeclaracion_datosEmpleoCargoComisionDOMMX .numeroInterior").text(nodo.domicilioMexico.numeroInterior);
        $("#pdfMiDeclaracion_datosEmpleoCargoComisionDOMMX .coloniaLocalidad").text(nodo.domicilioMexico.coloniaLocalidad);
        $("#pdfMiDeclaracion_datosEmpleoCargoComisionDOMMX .municipioAlcaldia").text(nodo.domicilioMexico.municipioAlcaldia.valor.toUpperCase());
        $("#pdfMiDeclaracion_datosEmpleoCargoComisionDOMMX .entidadFederativa").text(nodo.domicilioMexico.entidadFederativa.valor.toUpperCase());
        $("#pdfMiDeclaracion_datosEmpleoCargoComisionDOMMX .codigoPostal").text(nodo.domicilioMexico.codigoPostal);
        $("#pdfMiDeclaracion_datosEmpleoCargoComisionDOMMX .aclaracionesObservaciones").text(nodo.aclaracionesObservaciones);
    }
    else{
        //extranjero
        $("#pdfMiDeclaracion_datosEmpleoCargoComisionDOMEXT .calle").text(nodo.domicilioMexico.calle);
        $("#pdfMiDeclaracion_datosEmpleoCargoComisionDOMEXT .numeroExterior").text(nodo.domicilioMexico.numeroExterior);
        $("#pdfMiDeclaracion_datosEmpleoCargoComisionDOMEXT .numeroInterior").text(nodo.domicilioMexico.numeroInterior);
        $("#pdfMiDeclaracion_datosEmpleoCargoComisionDOMEXT .coloniaLocalidad").text(nodo.domicilioMexico.coloniaLocalidad);
        $("#pdfMiDeclaracion_datosEmpleoCargoComisionDOMEXT .estadoProvincia").text(nodo.domicilioMexico.estadoProvincia);
        $("#pdfMiDeclaracion_datosEmpleoCargoComisionDOMEXT .pais").text(nodo.domicilioMexico.pais.toUpperCase());
        $("#pdfMiDeclaracion_datosEmpleoCargoComisionDOMEXT .codigoPostal").text(nodo.domicilioMexico.codigoPostal);
        $("#pdfMiDeclaracion_datosEmpleoCargoComisionDOMEXT .aclaracionesObservaciones").text(nodo.aclaracionesObservaciones);
    }
}

function tblCV(){
    //EXPERIENCIA LABORAL
    let html="";
    html+='<tr><td colspan="3" style="background-color: #621132; color: #fff; font-size:14px;">5. EXPERIENCIA LABORAL</td></tr>';
    if(!jsonResult.declaracion.situacionPatrimonial.experienciaLaboral.ninguno){        
        Object.keys(jsonResult.declaracion.situacionPatrimonial.experienciaLaboral.experiencia).forEach(function (index) {
            var nodo = jsonResult.declaracion.situacionPatrimonial.experienciaLaboral.experiencia[index];

            if (nodo.ambitoSector.clave=="PUB"){
                html +='<tr style="background-color: #dee2e6;">\
                            <td colspan="2">NOMBRE DEL ENTE PÚBLICO/NOMBRE DE LA EMPRESA, SOCIEDAD O ASOCIACIÓN</td>\
                            <td>UBICACIÓN</td>\
                        </tr>\
                        <tr>\
                            <td colspan="2">' + nodo.nombreEntePublico + '</td>\
                            <td>' + nodo.ubicacion + '</td>\
                        </tr>\
                        <tr style="background-color: #dee2e6;">\
                            <td style="width: 34%;">ÁMBITO/SECTOR EN QUE LABORASTE</td>\
                            <td style="width: 33%;">NIVEL/ORDEN DE GOBIERNO</td>\
                            <td style="width: 33%;">ÁMBITO PÚBLICO</td>\
                        </tr>\
                        <tr>\
                            <td style="width: 34%;">' + nodo.ambitoSector.valor + '</td>\
                            <td style="width: 33%;">' + nodo.nivelOrdenGobierno + '</td>\
                            <td style="width: 33%;">' + nodo.ambitoPublico + '</td>\
                        </tr>\
                        <tr style="background-color: #dee2e6;">\
                            <td style="width: 34%;">EMPLEO, CARGO O COMISIÓN/PUESTO</td>\
                            <td style="width: 33%;">FECHA DE INGRESO</td>\
                            <td style="width: 33%;">FECHA DE EGRESO</td>\
                        </tr>\
                        <tr>\
                            <td style="width: 34%;">' + nodo.empleoCargoComision + '</td>\
                            <td style="width: 33%;">' + nodo.fechaIngreso + '</td>\
                            <td style="width: 33%;">' + nodo.fechaEgreso + '</td>\
                        </tr>';
            }
            else{
                html +=' <tr style="background-color: #dee2e6;">\
                            <td colspan="3">NOMBRE DEL ENTE PÚBLICO/NOMBRE DE LA EMPRESA, SOCIEDAD O ASOCIACIÓN</td>\
                        </tr>\
                        <tr>\
                            <td colspan="3">' +  nodo.nombreEmpresaSociedadAsociacion + '</td>\
                        </tr>\
                        <tr style="background-color: #dee2e6;">\
                            <td style="width: 34%;">ÁMBITO/SECTOR EN QUE LABORASTE</td>\
                            <td style="width: 33%;">NIVEL/ORDEN DE GOBIERNO</td>\
                            <td style="width: 33%;">ÁMBITO PÚBLICO</td>\
                        </tr>\
                        <tr>\
                            <td style="width: 34%;">' + nodo.ambitoSector.valor + '</td>\
                            <td style="width: 33%;">' + nodo.nivelOrdenGobierno + '</td>\
                            <td style="width: 33%;">' + nodo.ambitoPublico + '</td>\
                        </tr>\
                        <tr style="background-color: #dee2e6;">\
                            <td>RFC</td>\
                            <td>ÁREA DE ADSCRIPCIÓN</td>\
                        </tr>\
                        <tr style="background-color: #dee2e6;">\
                            <td>' + nodo.rfc + '</td>\
                            <td>' + nodo.area + '</td>\
                        </tr>\
                        <tr style="background-color: #dee2e6;">\
                            <td style="width: 34%;">EMPLEO, CARGO O COMISIÓN/PUESTO</td>\
                            <td style="width: 33%;">FECHA DE INGRESO</td>\
                            <td style="width: 33%;">FECHA DE EGRESO</td>\
                        </tr>\
                        <tr>\
                            <td style="width: 34%;">' + nodo.puesto + '</td>\
                            <td style="width: 33%;">' + nodo.fechaIngreso + '</td>\
                            <td style="width: 33%;">' + nodo.fechaEgreso + '</td>\
                        </tr>\
                        <tr style="background-color: #dee2e6;">\
                            <td colspan="2">SECTOR</td>\
                            <td>UBICACIÓN</td>\
                        </tr>\
                        <tr>\
                            <td colspan="2">' + nodo.sector.valor + '</td>\
                            <td>' + nodo.ubicacion + '</td>\
                        </tr>';
            }
            html+='<tr><td colspan="3" style="background-color: #fff; border:1px solid #fff; color: #fff; font-size:14px;"></td></tr>';
        }); 
        html+= '<tr style="background-color: #dee2e6;"><td colspan="3">ACLARACIONES/OBSERVACIONES</td></tr>\
                <tr>\
                    <td colspan="3">' + jsonResult.declaracion.situacionPatrimonial.experienciaLaboral.aclaracionesObservaciones + '</td>\
                </tr>';       
    }
    else{
        html +='<tr><td colspan="3">NO TENGO INFORMACIÓN QUE REPORTAR.</td></tr>\
                <tr style="background-color: #dee2e6;"><td colspan="3">ACLARACIONES/OBSERVACIONES</td></tr>\
                <tr>\
                    <td colspan="3">' + jsonResult.declaracion.situacionPatrimonial.experienciaLaboral.aclaracionesObservaciones + '</td>\
                </tr>';
    }
    $("#pdfMiDeclaracion_experienciaLaboral>tbody").empty().append(html);
}

function tblPareja(titulo){
    let html="";
    html +='<tr><td colspan="3" style="background-color: #621132; color: #fff; font-size:14px;">' + titulo + '</td></tr>';
    if(!jsonResult.declaracion.situacionPatrimonial.datosPareja.ninguno){
        var nodo = jsonResult.declaracion.situacionPatrimonial.datosPareja;
           
        html+="<tr style='background-color: #dee2e6;'>";
        html+=" <td>NOMBRE(S)</td>";
        html+=" <td>PRIMER APELLIDO</td>";
        html+=" <td>SEGUNDO APELLIDO</td>";
        html+="</tr>";
        html+="<tr>";
        html+=" <td>" + nodo.nombre + "</td>";
        html+=" <td>" + nodo.primerApellido + "</td>";
        html+=" <td>" + nodo.segundoApellido + "</td>";
        html+="</tr>";

        html+="<tr style='background-color: #dee2e6;'>";
        html+=" <td>FECHA DE NACIMIENTO</td>";
        html+=" <td>RFC</td>";
        html+=" <td>CURP</td>";
        html+="</tr>";
        html+="<tr>";
        html+=" <td>" + nodo.fechaNacimiento + "</td>";
        html+=" <td>" + nodo.rfc + "</td>";
        html+=" <td>" + nodo.curp + "</td>";
        html+="</tr>";
        
        html+="<tr style='background-color: #dee2e6;'>";
        html+=" <td colspan='3'>RELACIÓN CON EL DECLARANTE</td>";
        html+="</tr>";
        html+="<tr><td colspan='3'>" + nodo.relacionConDeclarante + "</td>";
        
        html+="<tr style='background-color: #dee2e6;'>";
        html+=" <td>¿ES DEPENDIENTE ECONÓMICO?</td>";
        html+=" <td>¿ES CIUDADANO EXTRANJERO?</td>";
        html+=" <td>¿HABITA EN EL DOMICILIO DEL DECLARANTE?</td>";
        html+="</tr>";
        html+="<tr>";
        html+=" <td>" + nodo.esDependienteEconomico + "</td>";
        html+=" <td>" + nodo.ciudadanoExtranjero + "</td>";
        html+=" <td>" + nodo.habitaDomicilioDeclarante + "</td>";
        html+="</tr>";

        if (nodo.lugarDondeReside=="MÉXICO"){
            html+='<tr style="background-color: #dee2e6;">\
                        <td style="width: 33%;">CALLE</td>\
                        <td style="width: 33%;">NUMERO EXTERIOR</td>\
                        <td style="width: 33%;">NUMERO INTERIOR</td>\
                    </tr>\
                    <tr>\
                        <td class="calle">' + nodo.domicilioMexico.calle + '</td>\
                        <td class="numeroExterior">' + nodo.domicilioMexico.numeroExterior + '</td>\
                        <td class="numeroInterior">' + nodo.domicilioMexico.numeroInterior + '</td>\
                    </tr>\
                    <tr style="background-color: #dee2e6;">\
                        <td>COLONIA/LOCALIDAD</td>\
                        <td>MUNICIPIO/ALCALDÍA</td>\
                        <td>ENTIDAD FEDERATIVA</td>\
                    </tr>\
                    <tr>\
                        <td class="coloniaLocalidad">' + nodo.domicilioMexico.coloniaLocalidad + '</td>\
                        <td class="municipioAlcaldia">' + nodo.domicilioMexico.municipioAlcaldia.valor + '</td>\
                        <td class="entidadFederativa">' + nodo.domicilioMexico.entidadFederativa.valor + '</td>\
                    </tr>\
                    <tr style="background-color: #dee2e6;">\
                        <td colspan="3">CODIGO POSTAL</td>\
                    </tr>\
                    <tr>\
                        <td class="codigoPostal" colspan="3" >' + nodo.domicilioMexico.codigoPostal + '</td>\
                    </tr>';
        }
        else{
            html+='<tr style="background-color: #dee2e6;">\
                        <td style="width: 33%;">CALLE</td>\
                        <td style="width: 33%;">NUMERO EXTERIOR</td>\
                        <td style="width: 33%;">NUMERO INTERIOR</td>\
                    </tr>\
                    <tr>\
                        <td class="calle">' + nodo.domicilioExtranjero.calle + '</td>\
                        <td class="numeroExterior">' + nodo.domicilioExtranjero.numeroExterior + '</td>\
                        <td class="numeroInterior">' + nodo.domicilioExtranjero.numeroInterior + '</td>\
                    </tr>\
                    <tr style="background-color: #dee2e6;">\
                        <td>CIUDAD/LOCALIDAD</td>\
                        <td>ESTADO/PROVINCIA/PAIS</td>\
                        <td>CÓDIGO POSTAL</td>\
                    </tr>\
                    <tr>\
                        <td class="ciudadLocalidad">' + nodo.domicilioExtranjero.ciudadLocalidad + '</td>\
                        <td class="estadoProvincia">' + nodo.domicilioExtranjero.estadoProvincia + " / " + nodo.domicilioExtranjero.pais + '</td>\
                        <td class="codigoPostal">' + nodo.domicilioExtranjero.codigoPostal + '</td>\
                    </tr>';
        }

        html +='<tr style="background-color: #dee2e6;"><td colspan="3">ACLARACIONES/OBSERVACIONES</td></tr>\
                <tr>\
                    <td colspan="3">' + jsonResult.declaracion.situacionPatrimonial.datosPareja.aclaracionesObservaciones + '</td>\
                </tr>';
    }
    else{
        html +='<tr><td colspan="3">NO TENGO INFORMACIÓN QUE REPORTAR.</td></tr>\
                <tr style="background-color: #dee2e6;"><td colspan="3">ACLARACIONES/OBSERVACIONES</td></tr>\
                <tr>\
                    <td colspan="3">' + jsonResult.declaracion.situacionPatrimonial.datosPareja.aclaracionesObservaciones + '</td>\
                </tr>';
    }
    $("#pdfMiDeclaracion_datos_pareja>tbody").empty().append(html); 
}

function tblDependienteEco(titulo){
    let html="";
    html +='<tr><td colspan="3" style="background-color: #621132; color: #fff; font-size:14px;">' + titulo + '</td></tr>';
    if(!jsonResult.declaracion.situacionPatrimonial.datosDependienteEconomico.ninguno){
        Object.keys(jsonResult.declaracion.situacionPatrimonial.datosDependienteEconomico.dependienteEconomico).forEach(function (index) {
            var nodo = jsonResult.declaracion.situacionPatrimonial.datosDependienteEconomico.dependienteEconomico[index];            
           
            html+="<tr style='background-color: #dee2e6;'>";
            html+=" <td>NOMBRE(S)</td>";
            html+=" <td>PRIMER APELLIDO</td>";
            html+=" <td>SEGUNDO APELLIDO</td>";
            html+="</tr>";
            html+="<tr>";
            html+=" <td>" + nodo.nombre + "</td>";
            html+=" <td>" + nodo.primerApellido + "</td>";
            html+=" <td>" + nodo.segundoApellido + "</td>";
            html+="</tr>";

            html+="<tr style='background-color: #dee2e6;'>";
            html+=" <td>FECHA DE NACIMIENTO</td>";
            html+=" <td>RFC</td>";
            html+=" <td>CURP</td>";
            html+="</tr>";
            html+="<tr>";
            html+=" <td>" + nodo.fechaNacimiento + "</td>";
            html+=" <td>" + nodo.rfc + "</td>";
            html+=" <td>" + nodo.curp + "</td>";
            html+="</tr>";
                
            html+="<tr style='background-color: #dee2e6;'>";
            html+=" <td>PARENTESCO O RELACIÓN CON EL DECLARANTE</td>";
            html+=" <td>¿ES CIUDADANO EXTRANJERO?</td>";
            html+=" <td>¿HABITA EN EL DOMICILIO DEL DECLARANTE?</td>";
            html+="</tr>";
            html+="<tr>";
            html+=" <td>" + nodo.parentescoRelacion.valor + "</td>";
            html+=" <td>" + nodo.ciudadanoExtranjero + "</td>";
            html+=" <td>" + nodo.habitaDomicilioDeclarante + "</td>";
            html+="</tr>";

            if (nodo.lugarDondeReside=="MÉXICO"){
                html+='<tr style="background-color: #dee2e6;">\
                            <td style="width: 33%;">CALLE</td>\
                            <td style="width: 33%;">NUMERO EXTERIOR</td>\
                            <td style="width: 33%;">NUMERO INTERIOR</td>\
                        </tr>\
                        <tr>\
                            <td class="calle">' + nodo.domicilioMexico.calle + '</td>\
                            <td class="numeroExterior">' + nodo.domicilioMexico.numeroExterior + '</td>\
                            <td class="numeroInterior">' + nodo.domicilioMexico.numeroInterior + '</td>\
                        </tr>\
                        <tr style="background-color: #dee2e6;">\
                            <td>COLONIA/LOCALIDAD</td>\
                            <td>MUNICIPIO/ALCALDÍA</td>\
                            <td>ENTIDAD FEDERATIVA</td>\
                        </tr>\
                        <tr>\
                            <td class="coloniaLocalidad">' + nodo.domicilioMexico.coloniaLocalidad + '</td>\
                            <td class="municipioAlcaldia">' + nodo.domicilioMexico.municipioAlcaldia.valor + '</td>\
                            <td class="entidadFederativa">' + nodo.domicilioMexico.entidadFederativa.valor + '</td>\
                        </tr>\
                        <tr style="background-color: #dee2e6;">\
                            <td colspan="3">CODIGO POSTAL</td>\
                        </tr>\
                        <tr>\
                            <td class="codigoPostal" colspan="3" >' + nodo.domicilioMexico.codigoPostal + '</td>\
                        </tr>';
            }
            else if (nodo.lugarDondeReside=="EXTRANJERO"){
                html+='<tr style="background-color: #dee2e6;">\
                            <td style="width: 33%;">CALLE</td>\
                            <td style="width: 33%;">NUMERO EXTERIOR</td>\
                            <td style="width: 33%;">NUMERO INTERIOR</td>\
                        </tr>\
                        <tr>\
                            <td class="calle">' + nodo.domicilioExtranjero.calle + '</td>\
                            <td class="numeroExterior">' + nodo.domicilioExtranjero.numeroExterior + '</td>\
                            <td class="numeroInterior">' + nodo.domicilioExtranjero.numeroInterior + '</td>\
                        </tr>\
                        <tr style="background-color: #dee2e6;">\
                            <td>CIUDAD/LOCALIDAD</td>\
                            <td>ESTADO/PROVINCIA/PAIS</td>\
                            <td>CÓDIGO POSTAL</td>\
                        </tr>\
                        <tr>\
                            <td class="ciudadLocalidad">' + nodo.domicilioExtranjero.ciudadLocalidad + '</td>\
                            <td class="estadoProvincia">' + nodo.domicilioExtranjero.estadoProvincia + " / " + nodo.domicilioExtranjero.pais + '</td>\
                            <td class="codigoPostal">' + nodo.domicilioExtranjero.codigoPostal + '</td>\
                        </tr>';
            }
        });
        html +='<tr style="background-color: #dee2e6;"><td colspan="3">ACLARACIONES/OBSERVACIONES</td></tr>\
                <tr>\
                    <td colspan="3">' + jsonResult.declaracion.situacionPatrimonial.datosDependienteEconomico.aclaracionesObservaciones + '</td>\
                </tr>';
    }
    else{
        html +='<tr><td colspan="3">NO TENGO INFORMACIÓN QUE REPORTAR.</td></tr>\
                <tr style="background-color: #dee2e6;"><td colspan="3">ACLARACIONES/OBSERVACIONES</td></tr>\
                <tr>\
                    <td colspan="3">' + jsonResult.declaracion.situacionPatrimonial.datosDependienteEconomico.aclaracionesObservaciones + '</td>\
                </tr>';
    }
    $("#pdfMiDeclaracion_datos_dependiente_eco>tbody").empty().append(html); 
}

function tblIngresos(titulo){
    let nodoIngresos = jsonResult.declaracion.situacionPatrimonial.ingresos
    let html="", remuneracionCargoPublico="", remuneracionCargoPublicoMoneda="", otrosIngresosTotal="", otrosIngresosTotalMoneda="";
    let ingresoNetoDeclarante ="",ingresoNetoDeclaranteMoneda="",ingresoNetoParejaDependiente="", ingresoNetoParejaDependienteMoneda="", totalIngresosNetos="", totalIngresosNetosMoneda="";
    let label1="", label2="",label3="",label4="",label5="",label6="";

    switch(jsonResult.captura.tipo_declaracion){
        case "INICIAL":               
            label1 = "I.- REMUNERACIÓN MENSUAL NETA DEL DECLARANTE POR SU CARGO PÚBLICO (POR CONCEPTO DE SUELDOS, HONORARIOS, COMPENSACIONES, BONOS Y OTRAS PRESTACIONES)(CANTIDADES NETAS DESPUÉS DE IMPUESTOS)";
            label2 = "II.- OTROS INGRESOS MENSUALES DEL DECLARANTE (SUMA DEL II.1 AL II.4)";
            label3 = "A.- INGRESO MENSUAL NETO DEL DECLARANTE (SUMA DEL NUMERAL I Y II)";
            label4 = "B.- INGRESO MENSUAL DE LA PAREJA Y/O DEPENDIENTES ECONÓMICOS (DESPUÉS DE IMPUESTOS)";
            label5 = "C.- TOTAL DE INGRESOS MENSUALES NETOS PERCIBIDOS POR EL DECLARANTE, PAREJA Y/O DEPENDIENTES ECONÓMICOS (SUMA DE LOS APARTADOS A Y B)";
            label6 = "II.4.- OTROS INGRESOS NO CONSIDERADOS A LOS ANTERIORES (DESPUÉS DE IMPUESTOS)";

            remuneracionCargoPublico = format(nodoIngresos.remuneracionMensualCargoPublico.valor);
            remuneracionCargoPublicoMoneda = nodoIngresos.remuneracionMensualCargoPublico.moneda;
            otrosIngresosTotal = format(nodoIngresos.otrosIngresosMensualesTotal.valor);
            otrosIngresosTotalMoneda =  nodoIngresos.otrosIngresosMensualesTotal.moneda;
            
            ingresoNetoDeclarante = format(nodoIngresos.ingresoMensualNetoDeclarante.valor);
            ingresoNetoDeclaranteMoneda = nodoIngresos.ingresoMensualNetoDeclarante.moneda;
            ingresoNetoParejaDependiente = format(nodoIngresos.ingresoMensualNetoParejaDependiente.valor);
            ingresoNetoParejaDependienteMoneda = nodoIngresos.ingresoMensualNetoParejaDependiente.moneda;
            totalIngresosNetos = format(nodoIngresos.totalIngresosMensualesNetos.valor);
            totalIngresosNetosMoneda = nodoIngresos.totalIngresosMensualesNetos.moneda;

            break;
        case "MODIFICACION":
            label1 = "I.- REMUNERACIÓN ANUAL NETA DEL DECLARANTE POR SU CARGO PÚBLICO (POR CONCEPTO DE SUELDOS, HONORARIOS, COMPENSACIONES, BONOS, AGUINALDOS Y OTRAS PRESTACIONES) (CANTIDADES NETAS DESPUÉS DE IMPUESTOS)";
            label2 = "II.- OTROS INGRESOS DEL DECLARANTE (SUMA DEL II.1 AL II.5)";
            label3 = "A.- INGRESO ANUAL NETO DEL DECLARANTE (SUMA DEL NUMERAL I Y II)";
            label4 = "B.- INGRESO ANUAL NETO DE LA PAREJA Y / O DEPENDIENTES ECONÓMICOS (DESPUÉS DE IMPUESTOS";
            label5 = "C.- TOTAL DE INGRESOS ANUALES NETOS PERCIBIDOS POR EL DECLARANTE, PAREJA Y / O DEPENDIENTES ECONÓMICOS (SUMA DE LOS APARTADOS A Y B)";
            label6 = "II.5 - OTROS INGRESOS NO CONSIDERADOS ANTERIORMENTE (DESPUÉS DE IMPUESTOS)";

            remuneracionCargoPublico = format(nodoIngresos.remuneracionAnualCargoPublico.valor);
            remuneracionCargoPublicoMoneda = nodoIngresos.remuneracionAnualCargoPublico.moneda;
            otrosIngresosTotal = format(nodoIngresos.otrosIngresosAnualesTotal.valor);
            otrosIngresosTotalMoneda =  nodoIngresos.otrosIngresosAnualesTotal.moneda;

            ingresoNetoDeclarante = format(nodoIngresos.ingresoAnualNetoDeclarante.valor);
            ingresoNetoDeclaranteMoneda = nodoIngresos.ingresoAnualNetoDeclarante.moneda;
            ingresoNetoParejaDependiente = format(nodoIngresos.ingresoAnualNetoParejaDependiente.valor);
            ingresoNetoParejaDependienteMoneda = nodoIngresos.ingresoAnualNetoParejaDependiente.moneda;
            totalIngresosNetos = format(nodoIngresos.totalIngresosAnualesNetos.valor);
            totalIngresosNetosMoneda = nodoIngresos.totalIngresosAnualesNetos.moneda;

            break;
        case "CONCLUSION":
            label1 = "I.- REMUNERACIÓN NETA DEL AÑO EN CURSO A LA FECHA DE CONCLUSIÓN DEL EMPLEO, CARGO O COMISIÓN DEL DECLARANTE POR SU CARGO PÚBLICO (POR CONCEPTO DE SUELDOS, HONORARIOS, COMPENSACIONES, BONOS Y OTRAS PRESTACIONES) (CANTIDADES NETAS DESPUÉS DE IMPUESTOS)";
            label2 = "II.- OTROS INGRESOS DEL DECLARANTE (SUMA DEL II.1 AL II.5)";
            label3 = "A.- INGRESOS DEL DECLARANTE DEL AÑO EN CURSO A LA FECHA DE CONCLUSIÓN DEL EMPLEO, CARGO O COMISIÓN(SUMA DEL NUMERAL I Y II)";
            label4 = "B.- INGRESOS DEL AÑO EN CURSO A LA FECHA DE CONCLUSIÓN DEL EMPLEO, CARGO O COMISIÓN DE LA PAREJA Y / O DEPENDIENTES ECONÓMICOS (DESPUÉS DE IMPUESTOS)";
            label5 = "C.- TOTAL DE INGRESOS NETOS DEL AÑO EN CURSO A LA FECHA DE CONCLUSIÓN DEL EMPLEO, CARGO O COMISIÓN PERCIBIDOS POR EL DECLARANTE, PAREJA Y / O DEPENDIENTES ECONÓMICOS (SUMA DE LOS APARTADOS A Y B)";
            label6 = "II.5 - OTROS INGRESOS NO CONSIDERADOS A LOS ANTERIORES (DESPUÉS DE IMPUESTOS)";

            remuneracionCargoPublico = format(nodoIngresos.remuneracionConclusionCargoPublico.valor);
            remuneracionCargoPublicoMoneda = nodoIngresos.remuneracionConclusionCargoPublico.moneda;
            otrosIngresosTotal = format(nodoIngresos.otrosIngresosConclusionTotal.valor);
            otrosIngresosTotalMoneda =  nodoIngresos.otrosIngresosConclusionTotal.moneda;

            ingresoNetoDeclarante = format(nodoIngresos.ingresoConclusionNetoDeclarante.valor);
            ingresoNetoDeclaranteMoneda = nodoIngresos.ingresoConclusionNetoDeclarante.moneda;
            ingresoNetoParejaDependiente = format(nodoIngresos.ingresoConclusionNetoParejaDependiente.valor);
            ingresoNetoParejaDependienteMoneda = nodoIngresos.ingresoConclusionNetoParejaDependiente.moneda;
            totalIngresosNetos = format(nodoIngresos.totalIngresosConclusionNetos.valor);
            totalIngresosNetosMoneda = nodoIngresos.totalIngresosConclusionNetos.moneda;

            break;
    }
    
    html +='<tr><td colspan="2" style="background-color: #621132; color: #fff; font-size:14px;">' + titulo + '</td></tr>';

    html +='<tr>\
                <td style="background-color: #dee2e6;">' + label1 + '</td>\
                <td style="text-align: right;">' + remuneracionCargoPublico + " " + remuneracionCargoPublicoMoneda +'</td>\
            </tr>\
            <tr>\
                <td style="background-color: #dee2e6;">' + label2 + '</td>\
                <td style="text-align: right;">' + otrosIngresosTotal + " " + otrosIngresosTotalMoneda + '</td>\
            </tr>\
            <tr style="background-color: #dee2e6;">\
                <td style="">II.1.- POR ACTIVIDAD INDUSTRIAL, COMERCIAL Y/O EMPRESARIAL (DESPUÉS DE IMPUESTOS)</td>\
                <td style="text-align: right;">' + format(nodoIngresos.actividadIndustialComercialEmpresarial.remuneracionTotal.valor) + " " + nodoIngresos.actividadIndustialComercialEmpresarial.remuneracionTotal.moneda + '</td>\
            </tr>';


    Object.keys(nodoIngresos.actividadIndustialComercialEmpresarial.actividades).forEach(function (index) {
        let nodo = nodoIngresos.actividadIndustialComercialEmpresarial.actividades[index];
        html +='<tr>\
                    <td style="">' + nodo.tipoNegocio + ' | ' + nodo.nombreRazonSocial+ '</td>\
                    <td style="text-align: right;">' + format(nodo.remuneracion.valor) + " " + nodo.remuneracion.moneda +'</td>\
                </tr>';
    });

    html +='<tr style="background-color: #dee2e6;">\
                <td style="">II.2.- POR ACTIVIDAD FINANCIERA (RENDIMIENTOS O GANANCIAS) (DESPUÉS DE IMPUESTOS)</td>\
                <td style="text-align: right;">' + format(nodoIngresos.actividadFinanciera.remuneracionTotal.valor) + " " + nodoIngresos.actividadFinanciera.remuneracionTotal.moneda + '</td>\
            </tr>';

    Object.keys(nodoIngresos.actividadFinanciera.actividades).forEach(function (index) {
        let nodo = nodoIngresos.actividadFinanciera.actividades[index];
        html +='<tr>\
                    <td style="">' + nodo.tipoInstrumento.valor + '</td>\
                    <td style="text-align: right;">' + format(nodo.remuneracion.valor) + " " + nodo.remuneracion.moneda +'</td>\
                </tr>';
    });

    html +='<tr style="background-color: #dee2e6;">\
                <td style="">II.3.- POR SERVICIOS PROFESIONALES, CONSEJOS, CONSULTORÍAS Y/O ASESORÍAS (DESPUÉS DE IMPUESTOS)</td>\
                <td style="text-align: right;">' + format(nodoIngresos.serviciosProfesionales.remuneracionTotal.valor) + " " + nodoIngresos.serviciosProfesionales.remuneracionTotal.moneda + '</td>\
            </tr>';

    Object.keys(nodoIngresos.serviciosProfesionales.servicios).forEach(function (index) {
        let nodo = nodoIngresos.serviciosProfesionales.servicios[index];
        html +='<tr>\
                    <td style="">' + nodo.tipoServicio + '</td>\
                    <td style="text-align: right;">' + format(nodo.remuneracion.valor) + " " + nodo.remuneracion.moneda +'</td>\
                </tr>';
    });

    

    switch(jsonResult.captura.tipo_declaracion){        
        case "INICIAL": 
            html +='<tr style="background-color: #dee2e6;">\
                        <td style="">' + label6 + '</td>\
                        <td style="text-align: right;">' + format(nodoIngresos.otrosIngresos.remuneracionTotal.valor) + " " + nodoIngresos.otrosIngresos.remuneracionTotal.moneda + '</td>\
                    </tr>';

            Object.keys(nodoIngresos.otrosIngresos.ingresos).forEach(function (index) {
                let nodo = nodoIngresos.otrosIngresos.ingresos[index];
                html +='<tr>\
                            <td style="">' + nodo.tipoIngreso + '</td>\
                            <td style="text-align: right;">' + format(nodo.remuneracion.valor) + " " + nodo.remuneracion.moneda +'</td>\
                        </tr>';
            });                     
        break;
        case "MODIFICACION": 
            html +='<tr style="background-color: #dee2e6;">\
                        <td style="">II.4.- POR ENAJENACIÓN DE BIENES (DESPUÉS DE IMPUESTOS)</td>\
                        <td style="text-align: right;">' + format(nodoIngresos.enajenacionBienes.remuneracionTotal.valor) + " " + nodoIngresos.enajenacionBienes.remuneracionTotal.moneda + '</td>\
                    </tr>';

            Object.keys(nodoIngresos.enajenacionBienes.bienes).forEach(function (index) {
                let subNodo = nodoIngresos.enajenacionBienes.bienes[index];
                html +='<tr>\
                            <td style="">' + subNodo.tipoBienEnajenado + '</td>\
                            <td style="text-align: right;">' + format(subNodo.remuneracion.valor) + " " + subNodo.remuneracion.moneda +'</td>\
                        </tr>';
            });

            html +='<tr style="background-color: #dee2e6;">\
                        <td style="">' + label6 + '</td>\
                        <td style="text-align: right;">' + format(nodoIngresos.otrosIngresos.remuneracionTotal.valor) + " " + nodoIngresos.otrosIngresos.remuneracionTotal.moneda + '</td>\
                    </tr>';  

            Object.keys(nodoIngresos.otrosIngresos.ingresos).forEach(function (index) {
                let nodo = nodoIngresos.otrosIngresos.ingresos[index];
                html +='<tr>\
                            <td style="">' + nodo.tipoIngreso + '</td>\
                            <td style="text-align: right;">' + format(nodo.remuneracion.valor) + " " + nodo.remuneracion.moneda +'</td>\
                        </tr>';
            });                          
        break;
        case "CONCLUSION": 
            html +='<tr style="background-color: #dee2e6;">\
                        <td style="">II.4.- POR ENAJENACIÓN DE BIENES (DESPUÉS DE IMPUESTOS)</td>\
                        <td style="text-align: right;">' + format(nodoIngresos.enajenacionBienes.remuneracionTotal.valor) + " " + nodoIngresos.enajenacionBienes.remuneracionTotal.moneda + '</td>\
                    </tr>';

            Object.keys(nodoIngresos.enajenacionBienes.bienes).forEach(function (index) {
                let subNodo = nodoIngresos.enajenacionBienes.bienes[index];
                html +='<tr>\
                            <td style="">' + subNodo.tipoBienEnajenado + '</td>\
                            <td style="text-align: right;">' + format(subNodo.remuneracion.valor) + " " + subNodo.remuneracion.moneda +'</td>\
                        </tr>';
            });

            html +='<tr style="background-color: #dee2e6;">\
                        <td style="">' + label6 + '</td>\
                        <td style="text-align: right;">' + format(nodoIngresos.otrosIngresos.remuneracionTotal.valor) + " " + nodoIngresos.otrosIngresos.remuneracionTotal.moneda + '</td>\
                    </tr>';  

            Object.keys(nodoIngresos.otrosIngresos.ingresos).forEach(function (index) {
                let nodo = nodoIngresos.otrosIngresos.ingresos[index];
                html +='<tr>\
                            <td style="">' + nodo.tipoIngreso + '</td>\
                            <td style="text-align: right;">' + format(nodo.remuneracion.valor) + " " + nodo.remuneracion.moneda +'</td>\
                        </tr>';
            });                              
        break;
    }
       
    html +='<tr>\
                <td style="background-color: #dee2e6;">' + label3 + '</td>\
                <td style="text-align: right;">' + ingresoNetoDeclarante + " " + ingresoNetoDeclaranteMoneda +'</td>\
            </tr>\
            <tr>\
                <td style="background-color: #dee2e6;">' + label4 + '</td>\
                <td style="text-align: right;">' + ingresoNetoParejaDependiente + " " + ingresoNetoParejaDependienteMoneda + '</td>\
            </tr>\
            <tr>\
                <td style="background-color: #dee2e6;">' + label5 + '</td>\
                <td style="text-align: right;">' + totalIngresosNetos + " " + totalIngresosNetosMoneda + '</td>\
            </tr>';   
            
    html += '<tr style="background-color: #dee2e6;"><td colspan="2">ACLARACIONES/OBSERVACIONES</td></tr>\
            <tr>\
                <td colspan="2">' + nodoIngresos.aclaracionesObservaciones + '</td>\
            </tr>';
    
    $("#pdfMiDeclaracion_ingresos>tbody").empty().append(html);
}

function tblDesempenoServidorPublico(titulo){
    let nodo = jsonResult.declaracion.situacionPatrimonial.actividadAnualAnterior
    let html="";
    html +='<tr><td colspan="2" style="background-color: #621132; color: #fff; font-size:14px;">' + titulo + '</td></tr>';
    if(jsonResult.declaracion.situacionPatrimonial.actividadAnualAnterior.ninguno){
        html +='<tr>\
                    <td style="background-color: #dee2e6;">I.- REMUNERACIÓN NETA DEL DECLARANTE, RECIBIDA DURANTE EL TIEMPO EN EL QUE SE DESEMPEÑÓ COMO SERVIDOR PÚBLICO EN EL AÑO INMEDIATO ANTERIOR (POR CONCEPTO DE SUELDOS, HONORARIOS, COMPENSACIONES, BONOS, AGUINALDOS Y OTRAS PRESTACIONES) (CANTIDADES NETAS DESPUÉS DE IMPUESTOS)</td>\
                    <td style="text-align: right;">' + format(nodo.remuneracionNetaCargoPublico.valor) + " " + nodo.remuneracionNetaCargoPublico.moneda +'</td>\
                </tr>\
                <tr>\
                    <td style="background-color: #dee2e6;">II.- OTROS INGRESOS MENSUALES DEL DECLARANTE (SUMA DEL II.1 AL II.5)</td>\
                    <td style="text-align: right;">' + format(nodo.otrosIngresosTotal.valor) + " " + nodo.otrosIngresosTotal.moneda + '</td>\
                </tr>\
                <tr style="background-color: #dee2e6;">\
                    <td style="">II.1.- POR ACTIVIDAD INDUSTRIAL, COMERCIAL Y/O EMPRESARIAL (DESPUÉS DE IMPUESTOS)</td>\
                    <td style="text-align: right;">' + format(nodo.actividadIndustialComercialEmpresarial.remuneracionTotal.valor) + " " + nodo.actividadIndustialComercialEmpresarial.remuneracionTotal.moneda + '</td>\
                </tr>';

        Object.keys(nodo.actividadIndustialComercialEmpresarial.actividades).forEach(function (index) {
            let subNodo = nodo.actividadIndustialComercialEmpresarial.actividades[index];
            html +='<tr>\
                        <td style="">' + subNodo.tipoNegocio + ' | ' + subNodo.nombreRazonSocial+ '</td>\
                        <td style="text-align: right;">' + format(subNodo.remuneracion.valor) + " " + subNodo.remuneracion.moneda +'</td>\
                    </tr>';
        });

        html +='<tr style="background-color: #dee2e6;">\
                    <td style="">II.2.- POR ACTIVIDAD FINANCIERA (RENDIMIENTOS O GANANCIAS) (DESPUÉS DE IMPUESTOS)</td>\
                    <td style="text-align: right;">' + format(nodo.actividadFinanciera.remuneracionTotal.valor) + " " + nodo.actividadFinanciera.remuneracionTotal.moneda + '</td>\
                </tr>';

        Object.keys(nodo.actividadFinanciera.actividades).forEach(function (index) {
            let subNodo = nodo.actividadFinanciera.actividades[index];
            html +='<tr>\
                        <td style="">' + subNodo.tipoInstrumento.valor + '</td>\
                        <td style="text-align: right;">' + format(subNodo.remuneracion.valor) + " " + subNodo.remuneracion.moneda +'</td>\
                    </tr>';
        });

        html +='<tr style="background-color: #dee2e6;">\
                    <td style="">II.3.- POR SERVICIOS PROFESIONALES, CONSEJOS, CONSULTORÍAS Y/O ASESORÍAS (DESPUÉS DE IMPUESTOS)</td>\
                    <td style="text-align: right;">' + format(nodo.serviciosProfesionales.remuneracionTotal.valor) + " " + nodo.serviciosProfesionales.remuneracionTotal.moneda + '</td>\
                </tr>';

        Object.keys(nodo.serviciosProfesionales.servicios).forEach(function (index) {
            let subNodo = nodo.serviciosProfesionales.servicios[index];
            html +='<tr>\
                        <td style="">' + subNodo.tipoServicio + '</td>\
                        <td style="text-align: right;">' + format(subNodo.remuneracion.valor) + " " + subNodo.remuneracion.moneda +'</td>\
                    </tr>';
        });

        html +='<tr style="background-color: #dee2e6;">\
                    <td style="">II.4.- POR ENAJENACIÓN DE BIENES (DESPUÉS DE IMPUESTOS)</td>\
                    <td style="text-align: right;">' + format(nodo.enajenacionBienes.remuneracionTotal.valor) + " " + nodo.enajenacionBienes.remuneracionTotal.moneda + '</td>\
                </tr>';

        Object.keys(nodo.enajenacionBienes.bienes).forEach(function (index) {
            let subNodo = nodo.enajenacionBienes.bienes[index];
            html +='<tr>\
                        <td style="">' + subNodo.tipoBienEnajenado + '</td>\
                        <td style="text-align: right;">' + format(subNodo.remuneracion.valor) + " " + subNodo.remuneracion.moneda +'</td>\
                    </tr>';
        });

        html +='<tr style="background-color: #dee2e6;">\
                    <td style="">II.5.- OTROS INGRESOS NO CONSIDERADOS A LOS ANTERIORES (DESPUÉS DE IMPUESTOS)</td>\
                    <td style="text-align: right;">' + format(nodo.otrosIngresos.remuneracionTotal.valor) + " " + nodo.otrosIngresos.remuneracionTotal.moneda + '</td>\
                </tr>';

        Object.keys(nodo.otrosIngresos.ingresos).forEach(function (index) {
            let subNodo = nodo.otrosIngresos.ingresos[index];
            html +='<tr>\
                        <td style="">' + subNodo.tipoIngreso + '</td>\
                        <td style="text-align: right;">' + format(subNodo.remuneracion.valor) + " " + subNodo.remuneracion.moneda +'</td>\
                    </tr>';
        });    

        html +='<tr>\
                    <td style="background-color: #dee2e6;">A.- INGRESO MENSUAL NETO DEL DECLARANTE (SUMA DEL NUMERAL I Y II)</td>\
                    <td style="text-align: right;">' + format(nodo.ingresoNetoAnualDeclarante.valor) + " " + nodo.ingresoNetoAnualDeclarante.moneda +'</td>\
                </tr>\
                <tr>\
                    <td style="background-color: #dee2e6;">B.- INGRESO MENSUAL DE LA PAREJA Y/O DEPENDIENTES ECONÓMICOS (DESPUÉS DE IMPUESTOS)</td>\
                    <td style="text-align: right;">' + format(nodo.ingresoNetoAnualParejaDependiente.valor) + " " + nodo.ingresoNetoAnualParejaDependiente.moneda + '</td>\
                </tr>\
                <tr>\
                    <td style="background-color: #dee2e6;">C.- TOTAL DE INGRESOS MENSUALES NETOS PERCIBIDOS POR EL DECLARANTE, PAREJA Y/O DEPENDIENTES ECONÓMICOS (SUMA DE LOS APARTADOS A Y B)</td>\
                    <td style="text-align: right;">' + format(nodo.totalIngresosNetosAnuales.valor) + " " + nodo.totalIngresosNetosAnuales.moneda + '</td>\
                </tr>';   
                
        html += '<tr style="background-color: #dee2e6;"><td colspan="2">ACLARACIONES/OBSERVACIONES</td></tr>\
                <tr>\
                    <td colspan="2">' + nodo.aclaracionesObservaciones + '</td>\
                </tr>';
    }
    else{
        html +='<tr><td colspan="2">NO TENGO INFORMACIÓN QUE REPORTAR.</td></tr>\
                <tr style="background-color: #dee2e6;"><td colspan="2">ACLARACIONES/OBSERVACIONES</td></tr>\
                <tr>\
                    <td colspan="2">' + jsonResult.declaracion.situacionPatrimonial.actividadAnualAnterior.aclaracionesObservaciones + '</td>\
                </tr>';
            }
    $("#pdfMiDeclaracion_desempenoServidorPublico>tbody").empty().append(html);
}

function tblVehiculos(titulo){
    let html="";
    html +='<tr><td colspan="3" style="background-color: #621132; color: #fff; font-size:14px;">' + titulo + '</td></tr>';
    if(!jsonResult.declaracion.situacionPatrimonial.vehiculos.ninguno){
        Object.keys(jsonResult.declaracion.situacionPatrimonial.vehiculos.vehiculo).forEach(function (index) {
            var nodo = jsonResult.declaracion.situacionPatrimonial.vehiculos.vehiculo[index];
            let titulares="";

            $(nodo.titular).each(function(index, item) { titulares+= item.valor + ","; });

            html+="<tr style='background-color: #dee2e6;'>";
            html+=" <td>TITULAR DEL VEHÍCULO</td>";
            html+=" <td>TIPO DEL VEHICULO</td>";
            html+=" <td>¿DÓNDE SE ENCUENTRA REGISTRADO?</td>";
            html+="</tr>";
            html+="<tr>";
            html+=" <td>" + titulares.slice(0, -1) + "</td>";
            html+=" <td>" + nodo.tipoVehiculo.valor + "</td>";
            html+=" <td>" + nodo.lugarRegistro.pais + "/" + nodo.lugarRegistro.entidadFederativa.valor + "</td>";
            html+="</tr>";

            if (Object.keys(nodo.tercero).length>0){
                Object.keys(nodo.tercero).forEach(function (index) {
                    let tercero=nodo.tercero[index];
                    html+="<tr style='background-color: #dee2e6;'>";
                    html+=" <td>TERCERO</td>";
                    html+=" <td>NOMBRE / INSTITUCIÓN O RAZÓN SOCIAL</td>";
                    html+=" <td>RFC</td>";
                    html+="</tr>";
                    html+="<tr>";
                    html+=" <td>" + tercero.tipoPersona + "</td>";
                    html+=" <td>" + tercero.nombreRazonSocial + "</td>";
                    html+=" <td>" + tercero.rfc + "</td>";
                    html+="</tr>";
                });
            }

            html+="<tr style='background-color: #dee2e6;'>";
            html+=" <td>MARCA</td>";
            html+=" <td>MODELO</td>";
            html+=" <td>AÑO</td>";
            html+="</tr>";
            html+="<tr>";
            html+=" <td>" + nodo.marca + "</td>";
            html+=" <td>" + nodo.modelo + "</td>";
            html+=" <td>" + nodo.anio + "</td>";            
            html+="</tr>";

            html+="<tr style='background-color: #dee2e6;'>";
            html+=" <td>NÚMERO DE SERIE O REGISTRO</td>";
            html+=" <td>VALOR DE ADQUISICIÓN</td>";
            html+=" <td>FECHA DE ADQUISICIÓN</td>";
            html+="</tr>";
            html+="<tr>";
            html+=" <td>" + nodo.numeroSerieRegistro + "</td>";
            html+=" <td style='text-align: right;'>" + format(nodo.valorAdquisicion.valor) + nodo.valorAdquisicion.moneda + "</td>";            
            html+=" <td>" + nodo.modelo + "</td>";
            html+="</tr>";

            html+="<tr style='background-color: #dee2e6;'>";
            html+=" <td>FORMA DE ADQUISICIÓN</td>";
            html+=" <td>FORMA DE PAGO</td>";
            html+=" <td>EN CASO DE BAJA DEL VEHÍCULO INCLUIR MOTIVO</td>";
            html+="</tr>";
            html+="<tr>";
            html+=" <td>" + nodo.formaAdquisicion.valor + "</td>";
            html+=" <td>" + nodo.formaPago + "</td>";            
            html+=" <td>" + nodo.motivoBaja.valor + "</td>";
            html+="</tr>";
         
            if (Object.keys(nodo.transmisor).length>0){
                Object.keys(nodo.transmisor).forEach(function (index) {
                    let tercero=nodo.transmisor[index];
                    html+="<tr style='background-color: #dee2e6;'>";
                    html+=" <td>TERCERO</td>";
                    html+=" <td>NOMBRE / INSTITUCIÓN O RAZÓN SOCIAL</td>";
                    html+=" <td>RELACIÓN</td>";
                    html+="</tr>";
                    html+="<tr>";
                    html+=" <td>" + tercero.tipoPersona +"/" +  tercero.rfc +"</td>";
                    html+=" <td>" + tercero.nombreRazonSocial + "</td>";
                    html+=" <td>" + tercero.relacion.clave + "</td>";
                    html+="</tr>";
                });
            }

            html+="<tr style='border-left:1px solid #fff; border-right:1px solid #fff;'><td colspan='3' style='border-left:1px solid #fff; border-right:1px solid #fff;'><td></tr>"                                
        });
        html +='<tr style="background-color: #dee2e6;"><td colspan="3">ACLARACIONES/OBSERVACIONES</td></tr>\
                <tr>\
                    <td colspan="3">' + jsonResult.declaracion.situacionPatrimonial.vehiculos.aclaracionesObservaciones + '</td>\
                </tr>';
    }
    else{
        html +='<tr><td colspan="3">NO TENGO INFORMACIÓN QUE REPORTAR.</td></tr>\
                <tr style="background-color: #dee2e6;"><td colspan="3">ACLARACIONES/OBSERVACIONES</td></tr>\
                <tr>\
                    <td colspan="3">' + jsonResult.declaracion.situacionPatrimonial.vehiculos.aclaracionesObservaciones + '</td>\
                </tr>';
    }
    $("#pdfMiDeclaracion_vehiculos>tbody").empty().append(html);  
}

function tblBienesMuebles(titulo){
    let html="";
    html +='<tr><td colspan="3" style="background-color: #621132; color: #fff; font-size:14px;">' + titulo + '</td></tr>';
    if(!jsonResult.declaracion.situacionPatrimonial.bienesMuebles.ninguno){
        Object.keys(jsonResult.declaracion.situacionPatrimonial.bienesMuebles.bienMueble).forEach(function (index) {
            var nodo = jsonResult.declaracion.situacionPatrimonial.bienesMuebles.bienMueble[index];
            let titulares="";

            $(nodo.titular).each(function(index, item) { titulares+= item.valor + ","; });

            html+="<tr style='background-color: #dee2e6;'>";
            html+=" <td>TITULAR DEL BIEN</td>";
            html+=" <td>TIPO DEL BIEN</td>";
            html+=" <td>DESCRIPCIÓN GENERAL DEL BIEN</td>";
            html+="</tr>";
            html+="<tr>";
            html+=" <td>" + titulares.slice(0, -1) + "</td>";
            html+=" <td>" + nodo.tipoBien.valor + "</td>";
            html+=" <td>" + nodo.descripcionGeneralBien + "</td>";
            html+="</tr>";

            if (Object.keys(nodo.tercero).length>0){
                Object.keys(nodo.tercero).forEach(function (index) {
                    let tercero=nodo.tercero[index];
                    html+="<tr style='background-color: #dee2e6;'>";
                    html+=" <td>TERCERO</td>";
                    html+=" <td>NOMBRE / INSTITUCIÓN O RAZÓN SOCIAL</td>";
                    html+=" <td>RFC</td>";
                    html+="</tr>";
                    html+="<tr>";
                    html+=" <td>" + tercero.tipoPersona + "</td>";
                    html+=" <td>" + tercero.nombreRazonSocial + "</td>";
                    html+=" <td>" + tercero.rfc + "</td>";
                    html+="</tr>";
                });
            }

            html+="<tr style='background-color: #dee2e6;'>";
            html+=" <td>FORMA DE ADQUISICIÓN</td>";
            html+=" <td>FORMA DE PAGO</td>";
            html+=" <td>VALOR DE ADQUISICIÓN DEL MUEBLE</td>";
            html+="</tr>";
            html+="<tr>";
            html+=" <td>" + nodo.formaAdquisicion.valor + "</td>";
            html+=" <td>" + nodo.formaPago + "</td>";
            html+=" <td style='text-align: right;'>" + format(nodo.valorAdquisicion.valor) + nodo.valorAdquisicion.moneda + "</td>";            
            html+="</tr>";

            html+="<tr style='background-color: #dee2e6;'>";
            html+=" <td>FECHA DE ADQUISICIÓN</td>";
            html+=" <td colspan='2'>EN CASO DE BAJA DEL MUEBLE INCLUIR MOTIVO</td>";
            html+="</tr>";
            html+="<tr>";
            html+=" <td>" + nodo.fechaAdquisicion + "</td>";
            html+=" <td colspan='2'>" + nodo.motivoBaja.valor + "</td>";
            html+="</tr>";

            if (Object.keys(nodo.transmisor).length>0){
                Object.keys(nodo.transmisor).forEach(function (index) {
                    let tercero=nodo.transmisor[index];
                    html+="<tr style='background-color: #dee2e6;'>";
                    html+=" <td>TERCERO</td>";
                    html+=" <td>NOMBRE / INSTITUCIÓN O RAZÓN SOCIAL</td>";
                    html+=" <td>RELACIÓN</td>";
                    html+="</tr>";
                    html+="<tr>";
                    html+=" <td>" + tercero.tipoPersona +"/" +  tercero.rfc +"</td>";
                    html+=" <td>" + tercero.nombreRazonSocial + "</td>";
                    html+=" <td>" + tercero.relacion.clave + "</td>";
                    html+="</tr>";
                });
            }

            html+="<tr style='border-left:1px solid #fff; border-right:1px solid #fff;'><td colspan='3' style='border-left:1px solid #fff; border-right:1px solid #fff;'><td></tr>"                                
        });
        html +='<tr style="background-color: #dee2e6;"><td colspan="3">ACLARACIONES/OBSERVACIONES</td></tr>\
                <tr>\
                    <td colspan="3">' + jsonResult.declaracion.situacionPatrimonial.bienesMuebles.aclaracionesObservaciones + '</td>\
                </tr>';
    }
    else{
        html +='<tr><td colspan="3">NO TENGO INFORMACIÓN QUE REPORTAR.</td></tr>\
                <tr style="background-color: #dee2e6;"><td colspan="3">ACLARACIONES/OBSERVACIONES</td></tr>\
                <tr>\
                    <td colspan="3">' + jsonResult.declaracion.situacionPatrimonial.bienesMuebles.aclaracionesObservaciones + '</td>\
                </tr>';
    }
    $("#pdfMiDeclaracion_bienes_muebles>tbody").empty().append(html);
}

function tblInversiones(titulo){
    let html="";
    html +='<tr><td colspan="3" style="background-color: #621132; color: #fff; font-size:14px;">' + titulo + '</td></tr>';
    if(!jsonResult.declaracion.situacionPatrimonial.inversiones.ninguno){
        Object.keys(jsonResult.declaracion.situacionPatrimonial.inversiones.inversion).forEach(function (index) {
            var nodo = jsonResult.declaracion.situacionPatrimonial.inversiones.inversion[index];
            let titulares="", saldo="", saldoMoneda="", saldolbl="", porcentajeIncrementoDecremento="";
            switch(jsonResult.captura.tipo_declaracion){
                case "INICIAL": 
                    saldolbl="SALDO INSOLUTO (SITUACIÓN ACTUAL)";
                    saldo = format(nodo.saldoSituacionActual.valor);
                    saldoMoneda = nodo.saldoSituacionActual.moneda;
                    porcentajeIncrementoDecremento="";
                    break;
                case "MODIFICACION": 
                    saldolbl="SALDO INSOLUTO AL 31 DE DICIEMBRE DEL AÑO INMEDIATO ANTERIOR";
                    saldo = format(nodo.saldoDiciembreAnterior.valor);
                    saldoMoneda = nodo.saldoDiciembreAnterior.moneda;
                    porcentajeIncrementoDecremento = nodo.porcentajeIncrementoDecremento + "% Incremento/Decremento";
                    break;
                case "CONCLUSION": 
                    saldolbl="SALDO INSOLUTO A LA FECHA DE CONCLUSIÓN DEL EMPLEO";
                    saldo = format(nodo.saldoFechaConclusion.valor);
                    saldoMoneda = nodo.saldoFechaConclusion.moneda;
                    porcentajeIncrementoDecremento = nodo.porcentajeIncrementoDecremento + "% Incremento/Decremento";
                    break;
            }

            $(nodo.titular).each(function(index, item) { titulares+= item.valor + ","; });

            html+="<tr style='background-color: #dee2e6;'>";
            html+=" <td>TTITULAR DE LA INVERSIÓN/CUENTA BANCARIA/OTROS</td>";
            html+=" <td>TIPO DE INVERSIÓN/ACTIVO</td>";
            html+=" <td>SUBTIPO INVERSIÓN</td>";
            html+="</tr>";
            html+="<tr>";
            html+=" <td>" + titulares.slice(0, -1) + "</td>";
            html+=" <td>" + nodo.tipoInversion.valor + "</td>";
            html+=" <td>" + nodo.subTipoInversion.valor + "</td>";
            html+="</tr>";

            if (Object.keys(nodo.tercero).length>0){
                Object.keys(nodo.tercero).forEach(function (index) {
                    let tercero=nodo.tercero[index];
                    html+="<tr style='background-color: #dee2e6;'>";
                    html+=" <td>TERCERO</td>";
                    html+=" <td>NOMBRE / INSTITUCIÓN O RAZÓN SOCIAL</td>";
                    html+=" <td>RFC</td>";
                    html+="</tr>";
                    html+="<tr>";
                    html+=" <td>" + tercero.tipoPersona + "</td>";
                    html+=" <td>" + tercero.nombreRazonSocial + "</td>";
                    html+=" <td>" + tercero.rfc + "</td>";
                    html+="</tr>";
                });
            }

            html+="<tr style='background-color: #dee2e6;'>";
            html+=" <td>NÚMERO DE CUENTA, CONTRATO O PÓLIZA</td>";
            html+=" <td>¿DÓNDE SE LOCALIZA LA INVERSIÓN, CUENTA BANCARIA Y OTRO TIPO DE VALORES / ACTIVOS ?</td>";
            html+=" <td>" + saldolbl + "</td>";
            html+="</tr>";
            html+="<tr>";
            html+=" <td style='text-align: right;'>" + nodo.numeroCuentaContrato + "</td>";
            html+=" <td>" + nodo.localizacionInversion.pais + "</td>";
            html+=" <td style='text-align: right;'>" + saldo + saldoMoneda +  "<br>" + porcentajeIncrementoDecremento + "</td>";            
            html+="</tr>";

            html+="<tr style='background-color: #dee2e6;'>";
            html+=" <td colspan='2'>NOMBRE / INSTITUCIÓN O RAZÓN SOCIAL</td>";
            html+=" <td>RFC</td>";
            html+="</tr>";
            html+="<tr>";
            html+=" <td colspan='2'>" + nodo.localizacionInversion.institucionRazonSocial + "</td>";
            html+=" <td>" + nodo.localizacionInversion.rfc + "</td>";
            html+="</tr>";

            html+="<tr style='border-left:1px solid #fff; border-right:1px solid #fff;'><td colspan='3' style='border-left:1px solid #fff; border-right:1px solid #fff;'><td></tr>"                                
        });
        html +='<tr style="background-color: #dee2e6;"><td colspan="3">ACLARACIONES/OBSERVACIONES</td></tr>\
                <tr>\
                    <td colspan="3">' + jsonResult.declaracion.situacionPatrimonial.inversiones.aclaracionesObservaciones + '</td>\
                </tr>';
    }
    else{
        html +='<tr><td colspan="3">NO TENGO INFORMACIÓN QUE REPORTAR.</td></tr>\
                <tr style="background-color: #dee2e6;"><td colspan="3">ACLARACIONES/OBSERVACIONES</td></tr>\
                <tr>\
                    <td colspan="3">' + jsonResult.declaracion.situacionPatrimonial.inversiones.aclaracionesObservaciones + '</td>\
                </tr>';
    }
    $("#pdfMiDeclaracion_inversiones>tbody").empty().append(html);
}

function tblAdeudos(titulo){
    let html="";
    html +='<tr><td colspan="3" style="background-color: #621132; color: #fff; font-size:14px;">' + titulo + '</td></tr>';
    if(!jsonResult.declaracion.situacionPatrimonial.adeudos.ninguno){
        Object.keys(jsonResult.declaracion.situacionPatrimonial.adeudos.adeudo).forEach(function (index) {
            var nodo = jsonResult.declaracion.situacionPatrimonial.adeudos.adeudo[index];
            let titulares="", saldo="", saldoMoneda="", saldolbl="", porcentajeIncrementoDecremento="";
            switch(jsonResult.captura.tipo_declaracion){
                case "INICIAL": 
                    saldolbl="SALDO INSOLUTO (SITUACIÓN ACTUAL)";
                    saldo = format(nodo.saldoInsolutoSituacionActual.valor);
                    saldoMoneda = nodo.saldoInsolutoSituacionActual.moneda;
                    porcentajeIncrementoDecremento="";
                    break;
                case "MODIFICACION": 
                    saldolbl="SALDO INSOLUTO AL 31 DE DICIEMBRE DEL AÑO INMEDIATO ANTERIOR";
                    saldo = format(nodo.saldoInsolutoDiciembreAnterior.valor);
                    saldoMoneda = nodo.saldoInsolutoDiciembreAnterior.moneda;
                    porcentajeIncrementoDecremento = nodo.porcentajeIncrementoDecremento + "% Incremento/Decremento";
                    break;
                case "CONCLUSION": 
                    saldolbl="SALDO INSOLUTO A LA FECHA DE CONCLUSIÓN DEL EMPLEO";
                    saldo = format(nodo.saldoInsolutoFechaConclusion.valor);
                    saldoMoneda = nodo.saldoInsolutoFechaConclusion.moneda;
                    porcentajeIncrementoDecremento = nodo.porcentajeIncrementoDecremento + "% Incremento/Decremento";
                    break;
            }

            $(nodo.titular).each(function(index, item) { titulares+= item.valor + ","; });

            html+="<tr>";
            html+=" <td colspan='3' style='font-size:12px;'>" + nodo.tipoAdeudo.valor + "</td>";
            html+="</tr>";
            html+="<tr style='background-color: #dee2e6;'>";
            html+=" <td>TITULAR DEL ADEUDO</td>";
            html+=" <td>FECHA DE ADQUISICIÓN DEL ADEUDO/PASIVO</td>";
            html+=" <td>NÚMERO DE CUENTA O CONTRATO</td>";
            html+="</tr>";
            html+="<tr>";
            html+=" <td>" + titulares.slice(0, -1) + "</td>";
            html+=" <td>" + nodo.fechaAdquisicion + "</td>";
            html+=" <td>" + nodo.numeroCuentaContrato + "</td>";
            html+="</tr>";

            if (Object.keys(nodo.tercero).length>0){
                Object.keys(nodo.tercero).forEach(function (index) {
                    let tercero=nodo.tercero[index];
                    html+="<tr style='background-color: #dee2e6;'>";
                    html+=" <td>TERCERO</td>";
                    html+=" <td>NOMBRE / INSTITUCIÓN O RAZÓN SOCIAL</td>";
                    html+=" <td>RFC</td>";
                    html+="</tr>";
                    html+="<tr>";
                    html+=" <td>" + tercero.tipoPersona + "</td>";
                    html+=" <td>" + tercero.nombreRazonSocial + "</td>";
                    html+=" <td>" + tercero.rfc + "</td>";
                    html+="</tr>";
                });
            }

            html+="<tr style='background-color: #dee2e6;'>";
            html+=" <td>MONTO ORIGINAL DEL ADEUDO/PASIVO</td>";
            html+=" <td>" + saldolbl + "</td>";
            html+=" <td>¿DÓNDE SE LOCALIZA EL ADEUDO?</td>";
            html+="</tr>";
            html+="<tr>";
            html+=" <td style='text-align: right;'>" + format(nodo.montoOriginal.valor) + nodo.montoOriginal.moneda + "</td>";
            html+=" <td style='text-align: right;'>" + saldo + saldoMoneda +  "<br>" + porcentajeIncrementoDecremento + "</td>";
            html+=" <td>" + nodo.localizacionAdeudo.pais + "</td>";
            html+="</tr>";

            html+="<tr style='background-color: #dee2e6;'>";
            html+=" <td>OTORGANTE DEL CRÉDITO</td>";
            html+=" <td>NOMBRE / INSTITUCIÓN O RAZÓN SOCIAL</td>";
            html+=" <td>RFC</td>";
            html+="</tr>";
            html+="<tr>";
            html+=" <td>" + nodo.otorganteCredito.tipoPersona + "</td>";
            html+=" <td>" + nodo.otorganteCredito.nombreInstitucion + "</td>";
            html+=" <td>" + nodo.otorganteCredito.rfc + "</td>";
            html+="</tr>";

            html+="<tr style='border-left:1px solid #fff; border-right:1px solid #fff;'><td colspan='3' style='border-left:1px solid #fff; border-right:1px solid #fff;'><td></tr>"                                
        });
        html +='<tr style="background-color: #dee2e6;"><td colspan="3">ACLARACIONES/OBSERVACIONES</td></tr>\
                <tr>\
                    <td colspan="3">' + jsonResult.declaracion.situacionPatrimonial.adeudos.aclaracionesObservaciones + '</td>\
                </tr>';
    }
    else{
        html +='<tr><td colspan="3">NO TENGO INFORMACIÓN QUE REPORTAR.</td></tr>\
                <tr style="background-color: #dee2e6;"><td colspan="3">ACLARACIONES/OBSERVACIONES</td></tr>\
                <tr>\
                    <td colspan="3">' + jsonResult.declaracion.situacionPatrimonial.adeudos.aclaracionesObservaciones + '</td>\
                </tr>';
    }
    $("#pdfMiDeclaracion_adeudos>tbody").empty().append(html);
}

function tblPrestamoOComodato(titulo){
    let html="";
    html +='<tr><td colspan="3" style="background-color: #621132; color: #fff; font-size:14px;">' + titulo + '</td></tr>';

    if(!jsonResult.declaracion.situacionPatrimonial.prestamoOComodato.ninguno){
        Object.keys(jsonResult.declaracion.situacionPatrimonial.prestamoOComodato.prestamo).forEach(function (index) {
            var nodo = jsonResult.declaracion.situacionPatrimonial.prestamoOComodato.prestamo[index];
            if (Object.keys(nodo.tipoBien)[0]=="inmueble"){
                html+="<tr>";
                html+=" <td colspan='3' style='font-size:12px;'>INMUEBLE | " + nodo.tipoBien.inmueble.tipoInmueble.valor + "</td>";
                html+="</tr>";
                if (Object.keys(nodo.tipoBien.inmueble).toString().indexOf("domicilioMexico") >-1){
                    html+='<tr style="background-color: #dee2e6;">\
                            <td style="width: 33%;">CALLE</td>\
                            <td style="width: 33%;">NUMERO EXTERIOR</td>\
                            <td style="width: 33%;">NUMERO INTERIOR</td>\
                        </tr>\
                        <tr>\
                            <td class="calle">' + nodo.tipoBien.inmueble.domicilioMexico.calle + '</td>\
                            <td class="numeroExterior">' + nodo.tipoBien.inmueble.domicilioMexico.numeroExterior + '</td>\
                            <td class="numeroInterior">' + nodo.tipoBien.inmueble.domicilioMexico.numeroInterior + '</td>\
                        </tr>\
                        <tr style="background-color: #dee2e6;">\
                            <td>COLONIA/LOCALIDAD</td>\
                            <td>MUNICIPIO/ALCALDÍA</td>\
                            <td>ENTIDAD FEDERATIVA</td>\
                        </tr>\
                        <tr>\
                            <td class="coloniaLocalidad">' + nodo.tipoBien.inmueble.domicilioMexico.coloniaLocalidad + '</td>\
                            <td class="municipioAlcaldia">' + nodo.tipoBien.inmueble.domicilioMexico.municipioAlcaldia.valor + '</td>\
                            <td class="entidadFederativa">' + nodo.tipoBien.inmueble.domicilioMexico.entidadFederativa.valor + '</td>\
                        </tr>\
                        <tr style="background-color: #dee2e6;">\
                            <td colspan="3">CODIGO POSTAL</td>\
                        </tr>\
                        <tr>\
                            <td class="codigoPostal" colspan="3" >' + nodo.tipoBien.inmueble.domicilioMexico.codigoPostal + '</td>\
                        </tr>';
                }
                else{
                    html+='<tr style="background-color: #dee2e6;">\
                                <td style="width: 33%;">CALLE</td>\
                                <td style="width: 33%;">NUMERO EXTERIOR</td>\
                                <td style="width: 33%;">NUMERO INTERIOR</td>\
                            </tr>\
                            <tr>\
                                <td class="calle">' + nodo.tipoBien.inmueble.domicilioExtranjero.calle + '</td>\
                                <td class="numeroExterior">' + nodo.tipoBien.inmueble.domicilioExtranjero.numeroExterior + '</td>\
                                <td class="numeroInterior">' + nodo.tipoBien.inmueble.domicilioExtranjero.numeroInterior + '</td>\
                            </tr>\
                            <tr style="background-color: #dee2e6;">\
                                <td>CIUDAD/LOCALIDAD</td>\
                                <td>ESTADO/PROVINCIA/PAIS</td>\
                                <td>CÓDIGO POSTAL</td>\
                            </tr>\
                            <tr>\
                                <td class="ciudadLocalidad">' + nodo.tipoBien.inmueble.domicilioExtranjero.ciudadLocalidad + '</td>\
                                <td class="estadoProvincia">' + nodo.tipoBien.inmueble.domicilioExtranjero.estadoProvincia + " / " + nodo.tipoBien.inmueble.domicilioExtranjero.pais + '</td>\
                                <td class="codigoPostal">' + nodo.tipoBien.inmueble.domicilioExtranjero.codigoPostal + '</td>\
                            </tr>';
                }
            }
            else{
                html+="<tr>";
                html+=" <td colspan='3' style='font-size:12px;'>VEHICULO | " + nodo.tipoBien.vehiculo.tipo.valor + "</td>";
                html+="</tr>";
                html+='<tr style="background-color: #dee2e6;">\
                            <td style="width: 33%;">MARCA</td>\
                            <td style="width: 33%;">MODELO</td>\
                            <td style="width: 33%;">AÑO</td>\
                        </tr>\
                        <tr>\
                            <td>' + nodo.tipoBien.vehiculo.marca + '</td>\
                            <td>' + nodo.tipoBien.vehiculo.modelo + '</td>\
                            <td>' + nodo.tipoBien.vehiculo.anio + '</td>\
                        </tr>\
                        <tr style="background-color: #dee2e6;">\
                            <td>NÚMERO DE SERIE O REGISTRO</td>\
                            <td>¿DÓNDE SE ENCUENTRA REGISTRADO?</td>\
                            <td>ENTIDAD FEDERATIVA</td>\
                        </tr>\
                        <tr>\
                            <td>' + nodo.tipoBien.vehiculo.numeroSerieRegistro + '</td>\
                            <td>' + nodo.tipoBien.vehiculo.lugarRegistro.pais + '</td>\
                            <td>' + nodo.tipoBien.vehiculo.lugarRegistro.entidadFederativa.valor + '</td>\
                        </tr>';
            }

            html+="<tr style='background-color: #dee2e6;'>";
            html+=" <td>NOMBRE DEL DUEÑO O TITULAR</td>";
            html+=" <td>TIPO/RFC</td>";
            html+=" <td>RELACIÓN CON EL DUEÑO/TITULAR</td>";
            html+="</tr>";
            html+="<tr>";
            html+=" <td>" + nodo.duenoTitular.nombreTitular + "</td>";
            html+=" <td>" + nodo.duenoTitular.tipoDuenoTitular + " / " + nodo.duenoTitular.rfc + "</td>";
            html+=" <td>" + nodo.duenoTitular.relacionConTitular + "</td>";
            html+="</tr>";
            html+="<tr><td colspan='3'><td></tr>"                                
        });
        html +='<tr style="background-color: #dee2e6;"><td colspan="3">ACLARACIONES/OBSERVACIONES</td></tr>\
                <tr>\
                    <td colspan="3">' + jsonResult.declaracion.situacionPatrimonial.prestamoOComodato.aclaracionesObservaciones + '</td>\
                </tr>';
    }
    else{
        html +='<tr><td colspan="3">NO TENGO INFORMACIÓN QUE REPORTAR.</td></tr>\
                <tr style="background-color: #dee2e6;"><td colspan="3">ACLARACIONES/OBSERVACIONES</td></tr>\
                <tr>\
                    <td colspan="3">' + jsonResult.declaracion.situacionPatrimonial.prestamoOComodato.aclaracionesObservaciones + '</td>\
                </tr>';
    }
    $("#pdfMiDeclaracion_prestamoOComodato>tbody").empty().append(html);
}



function tblInteresesTitulo(){
    let html="";
    html +='<tr><td colspan="3" style="color: #621132; border-bottom:1px solid #621132; font-size:14px;">DECLARACIÓN DE INTERESES</td></tr>';
    $("#pdfMiDeclaracion_interes_titulo>tbody").empty().append(html);          
}


function tblParticipacionEmpresas(){
    let html="";
    html +='<tr><td colspan="3" style="background-color: #621132; color: #fff; font-size:14px;">1. PARTICIPACIÓN EN EMPRESAS, SOCIEDADES O ASOCIACIONES</td></tr>';

    if(!jsonResult.declaracion.interes.participacion.ninguno){
        Object.keys(jsonResult.declaracion.interes.participacion.participacion).forEach(function (index) {
            let nodo = jsonResult.declaracion.interes.participacion.participacion[index];
            let recibe= "";
            nodo.recibeRemuneracion ==true ? realiza = "SI": realiza = "NO";

            html+="<tr>";
            html+=" <td colspan='3' style='font-size:12px;'>TIPO DE RELACIÓN | " + nodo.tipoBien.inmueble.tipoInmueble.valor + "</td>";
            html+="</tr>";

            html+="<tr style='background-color: #dee2e6;'>";
            html+=" <td>NOMBRE DE LA EMPRESA, SOCIEDAD O ASOCIACIÓN</td>";
            html+=" <td>RFC</td>";
            html+=" <td>PORCENTAJE DE PARTICIPACIÓN DE ACUERDO A ESCRITURA</td>";
            html+="</tr>";
            html+="<tr>";
            html+=" <td>" + nodo.nombreEmpresaSociedadAsociacion + "</td>";
            html+=" <td>" + nodo.rfc + "</td>";
            html+=" <td>" + nodo.porcentajeParticipacion + "%</td>";
            html+="</tr>";

            html+="<tr style='background-color: #dee2e6;'>";
            html+=" <td>TIPO DE PARTICIPACIÓN</td>";
            html+=" <td>¿RECIBE REMUNERACIÓN POR SU PARTICIPACIÓN?</td>";
            html+=" <td>MONTO MENSUAL NETO</td>";
            html+="</tr>";
            html+="<tr>";
            html+=" <td>" + nodo.tipoParticipacion.valor + "</td>";
            html+=" <td>" + recibe + "</td>";
            html+=" <td style='text-align: right;'>" + format(nodo.montoMensual.valor) + nodo.montoMensual.moneda + "</td>";
            html+="</tr>";
            
            html+="<tr style='background-color: #dee2e6;'>";
            html+=" <td>PAÍS</td>";
            html+=" <td>ENTIDAD FEDERATIVA</td>";
            html+=" <td>SECTOR PRODUCTIVO AL QUE PERTENECE</td>";
            html+="</tr>";
            html+="<tr>";
            html+=" <td>" + nodo.ubicacion.pais + "</td>";
            html+=" <td>" + nodo.ubicacion.entidadFederativa.valor + "</td>";
            html+=" <td>" + nodo.sector.valor + "</td>";
            html+="</tr>";

            html+="<tr><td colspan='3'><td></tr>"                                
        });
        html +='<tr style="background-color: #dee2e6;"><td colspan="3">ACLARACIONES/OBSERVACIONES</td></tr>\
                <tr>\
                    <td colspan="3">' + jsonResult.declaracion.interes.participacion.aclaracionesObservaciones + '</td>\
                </tr>';
    }
    else{
        html +='<tr><td colspan="3">NO TENGO INFORMACIÓN QUE REPORTAR.</td></tr>\
                <tr style="background-color: #dee2e6;"><td colspan="3">ACLARACIONES/OBSERVACIONES</td></tr>\
                <tr>\
                    <td colspan="3">' + jsonResult.declaracion.interes.participacion.aclaracionesObservaciones + '</td>\
                </tr>';
    }
    $("#pdfMiDeclaracion_participacion>tbody").empty().append(html);      
}

function tblParticipacionInstituciones(){
    let html="";
    html +='<tr><td colspan="3" style="background-color: #621132; color: #fff; font-size:14px;">2. ¿PARTICIPA EN ALGUNA DE ESTAS INSTITUCIONES?</td></tr>';

    if(!jsonResult.declaracion.interes.participacionTomaDecisiones.ninguno){
        Object.keys(jsonResult.declaracion.interes.participacionTomaDecisiones.participacion).forEach(function (index) {
            let nodo = jsonResult.declaracion.interes.participacionTomaDecisiones.participacion[index];
            let recibe= "";
            nodo.recibeRemuneracion ==true ? realiza = "SI": realiza = "NO";

            html+="<tr style='background-color: #dee2e6;'>";
            html+=" <td>TIPO DE RELACIÓN</td>";
            html+=" <td>TIPO DE INSTITUCIÓN</td>";
            html+="</tr>";
            html+="<tr>";
            html+=" <td>" + nodo.tipoRelacion + "</td>";
            html+=" <td>" + nodo.tipoInstitucion.valor + "</td>";
            html+="</tr>";

            html+="<tr style='background-color: #dee2e6;'>";
            html+=" <td>NOMBRE DE LA INSTITUCIÓN</td>";
            html+=" <td>RFC</td>";
            html+="</tr>";
            html+="<tr>";
            html+=" <td>" + nodo.nombreInstitucion + "</td>";
            html+=" <td>" + nodo.rfc + "</td>";
            html+="</tr>";
            
            html+="<tr style='background-color: #dee2e6;'>";
            html+=" <td>PUESTO/ROL</td>";
            html+=" <td>FECHA DE INICIO DE PARTICIPACIÓN DENTRO DE LA INSTITUCIÓN</td>";
            html+="</tr>";
            html+="<tr>";
            html+=" <td>" + nodo.puestoRol + "</td>";
            html+=" <td>" + nodo.fechaInicioParticipacion + "</td>";
            html+="</tr>";

            html+="<tr style='background-color: #dee2e6;'>";
            html+=" <td>¿RECIBE REMUNERACIÓN POR SU PARTICIPACIÓN?</td>";
            html+=" <td>MONTO MENSUAL NETO</td>";
            html+="</tr>";
            html+="<tr>";
            html+=" <td>" + recibe + "</td>";
            html+=" <td style='text-align: right;'>" + format(nodo.montoMensual.valor) + nodo.montoMensual.moneda + "</td>";
            html+="</tr>";

            html+="<tr style='background-color: #dee2e6;'>";
            html+=" <td>PAÍS</td>";
            html+=" <td>ENTIDAD FEDERATIVA</td>";
            html+="</tr>";
            html+="<tr>";
            html+=" <td>" + nodo.ubicacion.pais + "</td>";
            html+=" <td>" + nodo.ubicacion.entidadFederativa.valor + "</td>";
            html+="</tr>";
            
            html+="<tr><td colspan='3'><td></tr>"                                
        });
        html +='<tr style="background-color: #dee2e6;"><td colspan="3">ACLARACIONES/OBSERVACIONES</td></tr>\
                <tr>\
                    <td colspan="3">' + jsonResult.declaracion.interes.participacionTomaDecisiones.aclaracionesObservaciones + '</td>\
                </tr>';
    }
    else{
        html +='<tr><td colspan="3">NO TENGO INFORMACIÓN QUE REPORTAR.</td></tr>\
                <tr style="background-color: #dee2e6;"><td colspan="3">ACLARACIONES/OBSERVACIONES</td></tr>\
                <tr>\
                    <td colspan="3">' + jsonResult.declaracion.interes.participacionTomaDecisiones.aclaracionesObservaciones + '</td>\
                </tr>';
    }
    $("#pdfMiDeclaracion_participacionTomaDecisiones>tbody").empty().append(html);
}

function tblApoyos(){
    let html="";
    html +='<tr><td colspan="3" style="background-color: #621132; color: #fff; font-size:14px;">3. APOYOS O BENEFICIOS PÚBLICOS</td></tr>';

    if(!jsonResult.declaracion.interes.apoyos.ninguno){
        Object.keys(jsonResult.declaracion.interes.apoyos.apoyo).forEach(function (index) {
            var nodo = jsonResult.declaracion.interes.apoyos.apoyo[index];
           
            html+="<tr style='background-color: #dee2e6;'>";
            html+=" <td>TIPO DE PERSONA</td>";
            html+=" <td>BENEFICIARIO DE ALGÚN PROGRAMA PÚBLICO</td>";
            html+=" <td>NOMBRE DEL PROGRAMA</td>";
            html+="</tr>";
            html+="<tr>";
            html+=" <td>" + nodo.tipoPersona + "</td>";
            html+=" <td>" + nodo.beneficiarioPrograma.valor + "</td>";
            html+=" <td>" + nodo.nombrePrograma + "</td>";
            html+="</tr>";
            
            html+="<tr style='background-color: #dee2e6;'>";
            html+=" <td>INSTITUCIÓN QUE OTORGA EL APOYO</td>";
            html+=" <td>NIVEL U ÓRGANO DE GOBIERNO</td>";
            html+=" <td>TIPO DE APOYO</td>";
            html+="</tr>";
            html+="<tr>";
            html+=" <td>" + nodo.institucionOtorgante + "</td>";
            html+=" <td>" + nodo.nivelOrdenGobierno + "</td>";
            html+=" <td>" + nodo.tipoApoyo.valor + "</td>";
            html+="</tr>";
            
            html+="<tr style='background-color: #dee2e6;'>";
            html+=" <td>FORMA DE RECEPCIÓN DEL APOYO</td>";
            html+=" <td>MONTO APROXIMADO DEL APOYO MENSUAL</td>";
            html+=" <td>ESPECIFIQUE EL APOYO</td>";
            html+="</tr>";
            html+="<tr>";
            html+=" <td>" + nodo.formaRecepcion + "</td>";
            html+=" <td style='text-align: right;'>" + format(nodo.montoApoyoMensual.valor) + nodo.montoApoyoMensual.moneda + "</td>";
            html+=" <td>" + nodo.especifiqueApoyo + "</td>";
            html+="</tr>";            

            html+="<tr><td colspan='3'><td></tr>"                                
        });
        html +='<tr style="background-color: #dee2e6;"><td colspan="3">ACLARACIONES/OBSERVACIONES</td></tr>\
                <tr>\
                    <td colspan="3">' + jsonResult.declaracion.interes.apoyos.aclaracionesObservaciones + '</td>\
                </tr>';
    }
    else{
        html +='<tr><td colspan="3">NO TENGO INFORMACIÓN QUE REPORTAR.</td></tr>\
                <tr style="background-color: #dee2e6;"><td colspan="3">ACLARACIONES/OBSERVACIONES</td></tr>\
                <tr>\
                    <td colspan="3">' + jsonResult.declaracion.interes.apoyos.aclaracionesObservaciones + '</td>\
                </tr>';
    }
    $("#pdfMiDeclaracion_apoyos>tbody").empty().append(html); 
}

function tblRepresentacion(){
    let html="";
    html +='<tr><td colspan="2" style="background-color: #621132; color: #fff; font-size:14px;">4. REPRESENTACIÓN</td></tr>';

    if(!jsonResult.declaracion.interes.representacion.ninguno){
        Object.keys(jsonResult.declaracion.interes.representacion.representacion).forEach(function (index) {
            let nodo = jsonResult.declaracion.interes.representacion.representacion[index];
            let realiza= "";
            nodo.recibeRemuneracion ==true ? realiza = "SI": realiza = "NO";

            html+="<tr style='background-color: #dee2e6;'>";
            html+=" <td>TIPO DE RELACIÓN</td>";
            html+=" <td>TIPO DE REPRESENTACIÓN</td>";
            html+="</tr>";
            html+="<tr>";
            html+=" <td>" + nodo.tipoRelacion + "</td>";
            html+=" <td>" + nodo.tipoRepresentacion + "</td>";
            html+="</tr>";

            html+="<tr style='background-color: #dee2e6;'>";
            html+=" <td>FECHA DE INICIO DE LA REPRESENTACIÓN</td>";
            html+=" <td>REPRESENTANTE / REPRESENTADO</td>";
            html+="</tr>";
            html+="<tr>";
            html+=" <td>" + nodo.fechaInicioRepresentacion + "</td>";
            html+=" <td>" + nodo.tipoPersona + "</td>";
            html+="</tr>";

            html+="<tr style='background-color: #dee2e6;'>";
            html+=" <td>NOMBRE O RAZÓN SOCIAL DEL REPRESENTANTE / REPRESENTADO</td>";
            html+=" <td>RFC</td>";
            html+="</tr>";
            html+="<tr>";
            html+=" <td>" + nodo.nombreRazonSocial + "</td>";
            html+=" <td>" + nodo.rfc + "</td>";
            html+="</tr>";

            html+="<tr style='background-color: #dee2e6;'>";
            html+=" <td>¿RECIBE REMUNERACIÓN POR SU REPRESENTACIÓN?</td>";
            html+=" <td>MONTO MENSUAL NETO</td>";
            html+="</tr>";
            html+="<tr>";
            html+=" <td>" + nodo.realiza + "</td>";
            html+=" <td style='text-align: right;'>" + format(nodo.montoMensual.valor) + nodo.montoMensual.moneda + "</td>";
            html+="</tr>";

            html+="<tr style='background-color: #dee2e6;'>";
            html+=" <td>PAÍS/ENTIDAD FEDERATIVA</td>";
            html+=" <td>SECTOR PRODUCTIVO AL QUE PERTENECE</td>";
            html+="</tr>";
            html+="<tr>";
            html+=" <td>" + nodo.ubicacion.pais + "/" + nodo.ubicacion.entidadFederativa.valor + "</td>";
            html+=" <td>" + nodo.sector.valor + "</td>";
            html+="</tr>";

            html+="<tr><td colspan='2'><td></tr>"                                
        });
        html +='<tr style="background-color: #dee2e6;"><td colspan="3">ACLARACIONES/OBSERVACIONES</td></tr>\
                <tr>\
                    <td colspan="2">' + jsonResult.declaracion.interes.representacion.aclaracionesObservaciones + '</td>\
                </tr>';
    }
    else{
        html +='<tr><td colspan="2">NO TENGO INFORMACIÓN QUE REPORTAR.</td></tr>\
                <tr style="background-color: #dee2e6;"><td colspan="3">ACLARACIONES/OBSERVACIONES</td></tr>\
                <tr>\
                    <td colspan="2">' + jsonResult.declaracion.interes.representacion.aclaracionesObservaciones + '</td>\
                </tr>';
    }
    $("#pdfMiDeclaracion_representacion>tbody").empty().append(html);      
}

function tblClientes(){
    let html="";
    html +='<tr><td colspan="3" style="background-color: #621132; color: #fff; font-size:14px;">5. CLIENTES PRINCIPALES</td></tr>';

    if(!jsonResult.declaracion.interes.clientesPrincipales.ninguno){
        Object.keys(jsonResult.declaracion.interes.clientesPrincipales.cliente).forEach(function (index) {
            let nodo = jsonResult.declaracion.interes.clientesPrincipales.cliente[index];
            let realiza= "";
            nodo.realizaActividadLucrativa ==true ? realiza = "SI": realiza = "NO";
            html+="<tr style='background-color: #dee2e6;'>";
            html+=" <td colspan='2'>¿REALIZA ALGUNA ACTIVIDAD LUCRATIVA INDEPENDIENTE AL EMPLEO, CARGO O COMISIÓN?</td>";
            html+=" <td>TIPO DE RELACIÓN</td>";
            html+="</tr>";
            html+="<tr>";
            html+=" <td colspan='2'>" + realiza + "</td>";
            html+=" <td>" + nodo.tipoRelacion + "</td>";
            html+="</tr>";

            html+="<tr style='background-color: #dee2e6;'>";
            html+=" <td colspan='2'>NOMBRE DE LA EMPRESA O SERVICIO QUE PROPORCIONA</td>";
            html+=" <td>RFC</td>";
            html+="</tr>";
            html+="<tr>";
            html+=" <td colspan='2'>" + nodo.empresa.nombreEmpresaServicio + "</td>";
            html+=" <td>" + nodo.empresa.rfc + "</td>";
            html+="</tr>";

            html+="<tr style='background-color: #dee2e6;'>";
            html+=" <td>CLIENTE PRINCIPAL</td>";
            html+=" <td>SEÑALE NOMBRE O RAZÓN SOCIAL DEL CLIENTE PRINCIPAL</td>";
            html+=" <td>RFC</td>";
            html+="</tr>";
            html+="<tr>";
            html+=" <td>" + nodo.clientePrincipal.tipoPersona + "</td>";
            html+=" <td>" + nodo.clientePrincipal.nombreRazonSocial + "</td>";
            html+=" <td>" + nodo.clientePrincipal.rfc + "</td>";
            html+="</tr>";

            html+="<tr style='background-color: #dee2e6;'>";
            html+=" <td>SECTOR PRODUCTIVO AL QUE PERTENECE</td>";
            html+=" <td>MONTO APROXIMADO DEL BENEFICIO O GANANCIA MENSUAL QUE OBTIENE DEL CLIENTE PRINCIPAL</td>";
            html+=" <td>PAÍS/ENTIDAD FEDERATIVA</td>";
            html+="</tr>";
            html+="<tr>";
            html+=" <td>" + nodo.sector.valor + "</td>";
            html+=" <td style='text-align: right;'>" + format(nodo.montoAproximadoGanancia.valor) + nodo.montoAproximadoGanancia.moneda + "</td>";
            html+=" <td>" + nodo.ubicacion.pais + "/" + nodo.ubicacion.entidadFederativa.valor + "</td>";
            html+="</tr>";

            html+="<tr><td colspan='3'><td></tr>"                                
        });
        html +='<tr style="background-color: #dee2e6;"><td colspan="3">ACLARACIONES/OBSERVACIONES</td></tr>\
                <tr>\
                    <td colspan="3">' + jsonResult.declaracion.interes.clientesPrincipales.aclaracionesObservaciones + '</td>\
                </tr>';
    }
    else{
        html +='<tr><td colspan="3">NO TENGO INFORMACIÓN QUE REPORTAR.</td></tr>\
                <tr style="background-color: #dee2e6;"><td colspan="3">ACLARACIONES/OBSERVACIONES</td></tr>\
                <tr>\
                    <td colspan="3">' + jsonResult.declaracion.interes.clientesPrincipales.aclaracionesObservaciones + '</td>\
                </tr>';
    }
    $("#pdfMiDeclaracion_clientesPrincipales>tbody").empty().append(html);  
}

function tblBeneficios(){
    let html="";
    html +='<tr><td colspan="3" style="background-color: #621132; color: #fff; font-size:14px;">6. BENEFICIOS PRIVADOS</td></tr>';

    if(!jsonResult.declaracion.interes.beneficiosPrivados.ninguno){
        Object.keys(jsonResult.declaracion.interes.beneficiosPrivados.beneficio).forEach(function (index) {
            var nodo = jsonResult.declaracion.interes.beneficiosPrivados.beneficio[index];
            let beneficiarios="";
            $(nodo.beneficiario).each(function(index, item) {
                beneficiarios += item.valor + ",";           
            });

            html+="<tr style='background-color: #dee2e6;'>";
            html+=" <td>TIPO DE BENEFICIO</td>";
            html+=" <td colspan='2'>BENEFICIARIO(S):</td>";
            html+="</tr>";
            html+="<tr>";
            html+=" <td>" + nodo.tipoBeneficio.valor + "</td>";
            html+=" <td colspan='2'>" + beneficiarios.slice(0,-1) + "</td>";
            html+="</tr>";
            
            html+="<tr style='background-color: #dee2e6;'>";
            html+=" <td>OTORGANTE</td>";
            html+=" <td>NOMBRE O RAZÓN SOCIAL DEL OTORGANTE</td>";
            html+=" <td>RFC</td>";
            html+="</tr>";
            html+="<tr>";
            html+=" <td>" + nodo.otorgante.tipoPersona + "</td>";
            html+=" <td>" + nodo.otorgante.nombreRazonSocial + "</td>";
            html+=" <td>" + nodo.otorgante.rfc + "</td>";
            html+="</tr>";
            
            html+="<tr style='background-color: #dee2e6;'>";
            html+=" <td>FORMA DE RECEPCIÓN DEL BENEFICIO</td>";
            html+=" <td>ESPECIFIQUE EL BENEFICIO</td>";
            html+=" <td>MONTO MENSUAL APROXIMADO DEL BENEFICIO</td>";
            html+="</tr>";
            html+="<tr>";
            html+=" <td>" + nodo.formaRecepcion + "</td>";
            html+=" <td>" + nodo.especifiqueBeneficio + "</td>";
            html+=" <td style='text-align: right;'>" + format(nodo.montoMensualAproximado.valor) + nodo.montoMensualAproximado.moneda + "</td>";
            html+="</tr>";
            
            html+="<tr style='background-color: #dee2e6;'>";
            html+=" <td colspan='3'>SECTOR PRODUCTIVO AL QUE PERTENECE</td>";
            html+="</tr>";
            html+="<tr>";
            html+=" <td colspan='3'>" + nodo.sector.valor + "</td>";
            html+="</tr>";
                        
            html+="<tr><td colspan='3'><td></tr>"                                
        });
        html +='<tr style="background-color: #dee2e6;"><td colspan="3">ACLARACIONES/OBSERVACIONES</td></tr>\
                <tr>\
                    <td colspan="3">' + jsonResult.declaracion.interes.beneficiosPrivados.aclaracionesObservaciones + '</td>\
                </tr>';
    }
    else{
        html +='<tr><td colspan="3">NO TENGO INFORMACIÓN QUE REPORTAR.</td></tr>\
                <tr style="background-color: #dee2e6;"><td colspan="3">ACLARACIONES/OBSERVACIONES</td></tr>\
                <tr>\
                    <td colspan="3">' + jsonResult.declaracion.interes.beneficiosPrivados.aclaracionesObservaciones + '</td>\
                </tr>';
    }
    $("#pdfMiDeclaracion_beneficiosPrivados>tbody").empty().append(html);
}

function tblFideicomisos(){
    let html="";
    html +='<tr><td colspan="3" style="background-color: #621132; color: #fff; font-size:14px;">7. FIDEICOMISOS</td></tr>';

    if(!jsonResult.declaracion.interes.fideicomisos.ninguno){
        Object.keys(jsonResult.declaracion.interes.fideicomisos.fideicomiso).forEach(function (index) {
            var nodo = jsonResult.declaracion.interes.fideicomisos.fideicomiso[index];
           
            html+="<tr style='background-color: #dee2e6;'>";
            html+=" <td>PARTICIPACIÓN DE FIDEICOMISOS</td>";
            html+=" <td>TIPO DE FIDEICOMISO</td>";
            html+=" <td>TIPO DE PARTICIPACIÓN</td>";
            html+="</tr>";
            html+="<tr>";
            html+=" <td>" + nodo.tipoRelacion + "</td>";
            html+=" <td>" + nodo.tipoFideicomiso + "</td>";
            html+=" <td>" + nodo.tipoParticipacion + "</td>";
            html+="</tr>";

            html+="<tr style='background-color: #dee2e6;'>";
            html+=" <td>RFC DEL FIDEICOMISO</td>";
            html+=" <td>SECTOR PRODUCTIVO AL QUE PERTENECE</td>";
            html+=" <td>¿DÓNDE SE LOCALIZA EL FIDEICOMISO?</td>";
            html+="</tr>";
            html+="<tr>";
            html+=" <td>" + nodo.rfcFideicomiso + "</td>";
            html+=" <td>" + nodo.sector.valor + "</td>";
            html+=" <td>" + nodo.extranjero + "</td>";
            html+="</tr>";

            html+="<tr style='background-color: #dee2e6;'>";
            html+=" <td>FIDEICOMITENTE</td>";
            html+=" <td>NOMBRE O RAZÓN SOCIAL DEL FIDEICOMITENTE</td>";
            html+=" <td>RFC DEL FIDEICOMITENTE</td>";
            html+="</tr>";
            html+="<tr>";
            html+=" <td>" + nodo.fideicomitente.tipoPersona + "</td>";
            html+=" <td>" + nodo.fideicomitente.nombreRazonSocial + "</td>";
            html+=" <td>" + nodo.fideicomitente.rfc + "</td>";
            html+="</tr>";

            html+="<tr style='background-color: #dee2e6;'>";
            html+=" <td colspan='2'>NOMBRE O RAZÓN SOCIAL DEL FIDUCIARIO</td>";
            html+=" <td>RFC</td>";
            html+="</tr>";
            html+="<tr>";
            html+=" <td>" + nodo.fiduciario.nombreRazonSocial + "</td>";
            html+=" <td>" + nodo.fiduciario.rfc + "</td>";
            html+="</tr>";

            html+="<tr style='background-color: #dee2e6;'>";
            html+=" <td>FIDEICOMISARIO</td>";
            html+=" <td>NOMBRE O RAZÓN SOCIAL DEL FIDEICOMISARIO</td>";
            html+=" <td>RFC</td>";
            html+="</tr>";
            html+="<tr>";
            html+=" <td>" + nodo.fideicomisario.tipoPersona + "</td>";
            html+=" <td>" + nodo.fideicomisario.nombreRazonSocial + "</td>";
            html+=" <td>" + nodo.fideicomisario.rfc + "</td>";
            html+="</tr>";

            html+="<tr><td colspan='3'><td></tr>"                                
        });
        html +='<tr style="background-color: #dee2e6;"><td colspan="3">ACLARACIONES/OBSERVACIONES</td></tr>\
                <tr>\
                    <td colspan="3">' + jsonResult.declaracion.interes.fideicomisos.aclaracionesObservaciones + '</td>\
                </tr>';
    }
    else{
        html +='<tr><td colspan="3">NO TENGO INFORMACIÓN QUE REPORTAR.</td></tr>\
                <tr style="background-color: #dee2e6;"><td colspan="3">ACLARACIONES/OBSERVACIONES</td></tr>\
                <tr>\
                    <td colspan="3">' + jsonResult.declaracion.interes.fideicomisos.aclaracionesObservaciones + '</td>\
                </tr>';
    }
    $("#pdfMiDeclaracion_fideicomisos>tbody").empty().append(html);
}


function getDateTime(){
    var today = new Date();
    var date = today.getDate().toString().padStart(2,0) + '/' + (today.getMonth()+1).toString().padStart(2,0)  + '/' + today.getFullYear().toString();
    var time = today.getHours().toString().padStart(2,0) + ":" + today.getMinutes().toString().padStart(2,0) + ":" + today.getSeconds().toString().padStart(2,0);
    return  date+' '+time;
}