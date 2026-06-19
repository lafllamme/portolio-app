import abTastyLogo from '~/assets/logos/work/ab-tasty-logo-white.svg?raw'
import hotelbirdLogo from '~/assets/logos/work/hotelbird-logo-white.svg?raw'
import motelOneLogo from '~/assets/logos/work/motel-one-logo-white.svg?raw'
import storckLogo from '~/assets/logos/work/storck-logo-white.svg?raw'
import theCloudOneLogo from '~/assets/logos/work/the-cloud-one-logo-white.svg?raw'
import usercentricsLogo from '~/assets/logos/work/usercentrics-logo-white.svg?raw'
import veriskLogo from '~/assets/logos/work/verisk-logo-white.svg?raw'
import workmatrixLogo from '~/assets/logos/work/workmatrix-logo-white.svg?raw'
import yarowaLogo from '~/assets/logos/work/yarowa-logo-white.svg?raw'

export interface WorkLogoItem {
  alt: string
  company: string
  imgClass: string
  svg: string
  slotClass: string
  wrapperClass?: string
}

export const workLogosByCompany: Record<string, WorkLogoItem> = {
  'AB Tasty': {
    company: 'AB Tasty',
    svg: abTastyLogo,
    alt: 'AB Tasty logo',
    slotClass: 'w-[172px] md:w-[196px]',
    imgClass: 'h-[34px] md:h-[38px]',
  },
  'Hotelbird': {
    company: 'Hotelbird',
    svg: hotelbirdLogo,
    alt: 'Hotelbird logo',
    slotClass: 'w-[186px] md:w-[214px]',
    imgClass: 'h-[24px] md:h-[32px]',
  },
  'Motel One': {
    company: 'Motel One',
    svg: motelOneLogo,
    alt: 'Motel One logo',
    slotClass: 'w-[190px] md:w-[218px]',
    imgClass: 'h-[24px] md:h-[28px]',
  },
  'Storck': {
    company: 'Storck',
    svg: storckLogo,
    alt: 'Storck logo',
    slotClass: 'w-[126px] md:w-[148px]',
    imgClass: 'h-[31px] md:h-[36px]',
  },
  'The Cloud One': {
    company: 'The Cloud One',
    svg: theCloudOneLogo,
    alt: 'The Cloud One Hotels logo',
    slotClass: 'w-[268px] md:w-[318px]',
    imgClass: 'h-[31px] md:h-[36px]',
  },
  'Usercentrics': {
    company: 'Usercentrics',
    svg: usercentricsLogo,
    alt: 'Usercentrics logo',
    slotClass: 'w-[196px] md:w-[228px]',
    imgClass: 'h-[28px] md:h-[32px]',
  },
  'Verisk': {
    company: 'Verisk',
    svg: veriskLogo,
    alt: 'Verisk logo',
    slotClass: 'w-[132px] md:w-[154px]',
    imgClass: 'h-[26px] md:h-[30px]',
  },
  'Workmatrix': {
    company: 'Workmatrix',
    svg: workmatrixLogo,
    alt: 'Workmatrix logo',
    slotClass: 'w-[178px] md:w-[206px]',
    imgClass: 'h-[18px] md:h-[21px]',
  },
  'Yarowa': {
    company: 'Yarowa',
    svg: yarowaLogo,
    alt: 'Yarowa logo',
    slotClass: 'w-[154px] md:w-[184px]',
    imgClass: 'h-[24px] md:h-[28px]',
  },
}
