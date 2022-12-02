import cv2
import matplotlib.pyplot as plt
import easyocr


def find_plate_no(file_dir):
    #img = cv2.imread('images/ml_img_sample/plate_108.jpg')
    img = cv2.imread(file_dir)
    reader = easyocr.Reader(['ko'], ['en'])  # 한글,영어를 인식하고 gpu를 사용하지 않는다.
    result = reader.readtext(img)  # filePath는 이미지 경로를 넣어주면 된다.
    txts = [line[1] for line in result]  # 텍스트만 가져오기
    #print('txts: ', txts)
    # print(type(txts))
    return txts[0]  # 221130 선우 - 인식한 텍스트의 결과값인 txts 는 list 형태임 => 0번째 결과값을 리턴
